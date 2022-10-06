const {authHelper} = require("../helpers/index");
const {OAuth} = require("../dataBase");
module.exports = {
  checkAccessToken: async ( req, res, next ) => {
    try {
      const token = req.get('authorization');
      console.log('token', token)
      if (!token) {
        return res
          .status(401)
          .json({message: 'No token!'})
      }
      await authHelper.verifyToken(token);

      const tokenObj = await OAuth.findOne({jvt_token: token});
      console.log('//////////////////')
      console.log('tokenObj' , tokenObj)
      console.log('////////////////////')
      if (!tokenObj) {
        return res
          .status(401)
          .json({message: 'Wrong token'})
      }
      req.user = {
        userId: tokenObj.user._id,
        email: tokenObj.user.email,
      };
      next()
    } catch (e) {
      next(e)
    }
  }
}
