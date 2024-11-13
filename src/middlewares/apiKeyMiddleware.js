/** @format */

import User from '../models/user.js';

const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.query.apikey;

  if (!apiKey) {
    return res.status(401).json({
      error: 'API key is required.',
    });
  }

  // Validate API key
  const user = await User.findOne({
    apiKey,
  });

  if (!user) {
    return res.status(401).json({
      error: 'Invalid API key.',
    });
  }

  // Check user status
  if (user.status === 'premium' && user.limit <= 0) {
    return res.status(403).json({
      error: 'Premium user limit exceeded.',
    });
  }

  next();
};

export default apiKeyMiddleware;
