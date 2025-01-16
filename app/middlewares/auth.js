const express = require('express');
const { authenticate, authorize } = require('./middlewares/auth');

const router = express.Router();

router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.send('Welcome Admin');
});

router.get('/basic', authenticate, authorize(['basic', 'admin']), (req, res) => {
  res.send('Welcome Basic User');
});

module.exports = router;
