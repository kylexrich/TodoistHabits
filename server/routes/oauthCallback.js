const express = require('express');
const router = express.Router();

const { oauthCallback } = require('../controllers/oauthCallback');

router.get('/', (req, res) => {
  oauthCallback(req, res);
});

module.exports = router;
