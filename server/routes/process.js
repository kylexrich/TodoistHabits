const express = require('express');
const router = express.Router();

const { processHabitContextMenu } = require('../controllers/process');

router.get('/habit-context-menu', (req, res) => {
  processHabitContextMenu(req, res);
});

module.exports = router;
