const axios = require('axios');

const gptApi = axios.create({
  baseURL: 'https://api.example.com',
});

module.exports = gptApi;
