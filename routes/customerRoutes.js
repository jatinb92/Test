const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');

// will route to the customerController for the implementation of business logic
router.get('/', customerController.getPosts);


module.exports = router;