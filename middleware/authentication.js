const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication failed')
  } 
  try {
    const { name, roles, userId } = isTokenValid({ token });
    req.user = { name, userId, roles };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication failed');
  }
}

const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      throw new CustomError.UnauthorizedError('Unauthorized to access this route')
    }
    next();
  }
}

module.exports = {
  authenticateUser,
  authorizedPermissions
}