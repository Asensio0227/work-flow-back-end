const createTokenUser = (user) => {
  // console.log(use)
  const tokenUser = { name: user.name, userId: user._id, roles: user.roles };
  return tokenUser;
};

module.exports = createTokenUser;