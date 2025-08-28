const jwt = require('jsonwebtoken');
// const Redis = require('ioredis');
const UserService = require('./user.service');
const RefreshToken = require('../models/RefreshToken');

// const redis = new Redis(process.env.REDIS_URL);

class TokensService {
  static async generateTokens(user) {
    const payload = { sub: user._id.toString(), email: user.email };
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_TTL || '300s' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_TTL || '7d' });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await RefreshToken.create({ userId: user._id, token: refreshToken, expiresAt });
    // await redis.set(`refresh:${refreshToken}`, user._id.toString(), 'EX', 7*24*3600);

    return { accessToken, refreshToken };
  }

  static async refreshAccessToken(refreshToken) {
    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
    if (!tokenDoc) throw new Error('Invalid refresh token');
    const user = await UserService.findById(tokenDoc.userId);
    return this.generateTokens(user);
  }

  static async revokeRefreshToken(refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
    // await redis.del(`refresh:${refreshToken}`);
  }
}

module.exports = TokensService;
