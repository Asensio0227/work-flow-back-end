const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse
} = require('./jwt');

const createTokenUser = require("./create-token");
const checkPermissions = require("./checkPermissions");
const sendEmail = require('./sendEmail');
const sendVerificationEmail = require('./sendVerificationEmail');
const createHash = require('./createHash');
const sendResetPasswordEmail = require('./sendResetPassword');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendEmail,
  sendVerificationEmail,
  createHash,
  sendResetPasswordEmail
};