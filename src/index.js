require('dotenv').config({ path: '.env' });
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const {
  DoistCard,
  SubmitAction,
  TextBlock,
} = require('@doist/ui-extensions-core');
const { OpenUrlAction } = require("@doist/ui-extensions-core/dist/doist-card/actions");
const path = require("path");
const e = require("express");

const app = express();
const port = process.env.PORT;

app.use(express.json());

const database = {};

// Todoist application's client ID and client secret
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.get('/authorize', (req, res) => {
  // Redirect user to Todoist's authorization page
  const url = `https://todoist.com/oauth/authorize?client_id=${CLIENT_ID}&scope=data:read_write&state=xyz`;
  console.log('/authorize');
  res.redirect(url);
});

app.get('/oauth-callback', async (req, res) => {
  // Todoist redirects back with authorization code
  const { code, state } = req.query;
  console.log('/oauth-callback');

  try {
    // Exchange authorization code for access token
    const response = await axios.post(
      'https://todoist.com/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }
    );

    const { access_token } = response.data;

    // Save the access token for this user in database
    database[state] = {
      access_token,
    };

    res.redirect(`https://todoist-habits.herokuapp.com/success`);
  } catch (error) {
    console.log(error);
    res.send('An error occurred while trying to authenticate');
  }
});

const processRequest = async function (req, res) {
  const doistRequest = req.body;
  const { action, context } = doistRequest;

  if (action.actionType === 'initial') {
    const card = new DoistCard();
    card.addItem(
      TextBlock.from({
        text: 'Hello, my friend!',
      })
    );
    card.addAction(
      SubmitAction.from({
        id: 'Action.Submit',
        title: 'Add Q to task',
        style: 'positive',
      })
    );

    res.status(200).json({ card: card });
  } else if (action.actionType === 'submit' && action.actionId === 'Action.Submit') {
    const card = new DoistCard();
    card.addItem(TextBlock.from({
      text: 'Hello, my friend!',
    }));
    card.addAction(
      OpenUrlAction.from({
        id: 'Action.OpenUrl',
        url: `https://todoist.com/oauth/authorize?client_id=${CLIENT_ID}&scope=data:read_write&state=xyz`
      }),
    );
    res.status(200).json({card: card});
  }
};

const build = path.join(__dirname, './client');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(build));
  app.get('/success', (req, res) => {
    res.sendFile(path.resolve(build,'success.html'));
  });
}

app.post('/ui-extension', processRequest);


app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
