const TokensService = require('../services/tokens.service');

class AuthController {
  static async googleCallback(req, res) {
    try {
      const user = req.user;
      const { accessToken, refreshToken } = await TokensService.generateTokens(user);
      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7*24*3600*1000, sameSite:'lax' });
      res.redirect(`${process.env.FRONTEND_URL}/auth/complete?accessToken=${accessToken}`);
    } catch (err) {
      res.status(500).json({ error: 'Auth failed' });
    }
  }

  static async refresh(req, res) {
    try {
      const token = req.cookies['refreshToken'];
      const { accessToken } = await TokensService.refreshAccessToken(token);
      res.json({ accessToken });
    } catch {
      res.status(401).json({ error: 'invalid refresh' });
    }
  }

  static async logout(req, res) {
    const token = req.cookies['refreshToken'];
    if (token) await TokensService.revokeRefreshToken(token);
    res.clearCookie('refreshToken');
    res.json({ ok: true });
  }
}

module.exports = AuthController;
