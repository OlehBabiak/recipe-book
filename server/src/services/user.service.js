const jwt = require('jsonwebtoken');

module.exports = {
  createTokenPair: (payload) => {
    const jwt_token = jwt.sign(payload, 'Access_secret', { expiresIn: '2m' });
    const refresh_token = jwt.sign(payload, 'Refresh_secret', { expiresIn: '5m' });

    return {
      jwt_token,
      refresh_token,
    };
  },
  createLoginPayload: (email, id) => ({
    userEmail: email,
    userId: id,
  }),
};
