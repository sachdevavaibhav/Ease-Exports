const basicAuth = require('express-basic-auth');

async function myAuthorizer(username, password) {
  const user = await User.findOne({ username: username });
  
  if (user) {
    return basicAuth.safeCompare(user.password, password);
  }

  return false;
}

module.exports = myAuthorizer;