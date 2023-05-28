const express = require('express');
const { signup, login, getLoggedInUser } = require('../controllers/userController');
const fetchUser = require('../middleware/fetchUser');

const router = express.Router();

// routes
router.route('/signup').post(signup);
router.route('/login').post(login);
router.post("/getuser", fetchUser, getLoggedInUser)

module.exports = router;