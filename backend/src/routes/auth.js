const router = require('express').Router();
const passport = require('passport');
const AuthController = require('../controllers/auth.controller');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), AuthController.googleCallback);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

module.exports = router;
