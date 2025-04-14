const express = require('express');
const router = express.Router();

const { loginUser, signupUser, logoutUser,refreshAccessToken } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshAccessToken);

module.exports = router;