const jwt = require('jsonwebtoken');

class JWT {
  /**
   * Generate an access token
   * @param {Object} payload - user payload
   * @param {String} expiresIn - expiration time (e.g., '5m', '1h')
   */
  static generateAccessToken(payload, expiresIn = process.env.ACCESS_TOKEN_TTL || '300s') {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn });
  }

  /**
   * Generate a refresh token
   * @param {Object} payload - user payload
   * @param {String} expiresIn - expiration time (e.g., '7d')
   */
  static generateRefreshToken(payload, expiresIn = process.env.REFRESH_TOKEN_TTL || '7d') {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn });
  }

  /**
   * Verify access token
   * @param {String} token 
   * @returns {Object} decoded payload
   */
  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      throw new Error('Invalid or expired access token');
    }
  }

  /**
   * Verify refresh token
   * @param {String} token 
   * @returns {Object} decoded payload
   */
  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      throw new Error('Invalid or expired refresh token');
    }
  }
}

module.exports = JWT;
