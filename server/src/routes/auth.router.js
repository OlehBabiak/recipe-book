const router = require('express').Router();
const { authMiddleware, userMiddleware } = require('../middlevares/index');
const { authController } = require('../controllers/index');

router.post('/register', userMiddleware.checkUserValidityMiddleware, userMiddleware.isUserExistMiddleware, authController.register);
router.post('/login', authController.login);
// router.post('/logout', authMiddleware.checkAccessToken)
// router.post('/refresh', authMiddleware.checkAccessToken)
// router.post('/forgot_password', userMiddleware.checkEmailMiddleware)

module.exports = router;
