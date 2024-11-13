/** @format */

import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        error: 'Token not provided.',
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, 'Konbanwa');
    } catch (err) {
      if (err.name === 'TokenExpiredError' && err.message === 'jwt expired') {
        return res.status(401).json({
          error:
            'Email verification token has expired. Please request a new verification email.',
        });
      }
      throw err;
    }

    const user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found.',
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        error: 'User is already verified.',
      });
    }

    user.isVerified = true;
    await user.save();

    const filePath = path.resolve(
      __dirname,
      '../views/pages/assets/verification.html'
    );
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});

export default router;
