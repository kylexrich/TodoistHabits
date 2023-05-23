require('dotenv').config({ path: '.env' });
const axios = require('axios');
const oauthCallback = async (req, res) => {
  // Todoist redirects back with authorization code
  const { code, state } = req.query;

  try {
    // Exchange authorization code for access token
    const response = await axios.post(
      'https://todoist.com/oauth/access_token',
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
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
};

module.exports = {
  oauthCallback,
};
