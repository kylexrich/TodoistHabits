require('dotenv').config({ path: '.env' });
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const oauthCallbackRoute = require('./routes/oauthCallback');
app.get('/api/oauth-callback', oauthCallbackRoute);

const processRoutes = require('./routes/process');
app.post('/api/process', processRoutes);

const build = path.join(__dirname, '../client/build');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(build));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(build, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
