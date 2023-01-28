const express = require('express');
const router = express.Router();

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  ResetPassword
} = require("../controllers/authController");

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.delete('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', ResetPassword);

module.exports = router;