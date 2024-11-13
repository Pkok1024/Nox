/** @format */

import express from 'express';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import sendVerificationEmail from '../middlewares/auth.js';
const router = express.Router();

router.get('/auth/register', registerUser);
router.get('/auth/profile', getUserProfile);
router.get('/cekey', checkApiKey);

async function registerUser(req, res) {
  try {
    const { email, password, username, apiKey } = req.query;

    if (!email || !validator.isEmail(email))
      return res.status(400).json({
        error: 'Valid email is required.',
      });
    if (
      !password ||
      !validator.isLength(password, {
        min: 6,
      })
    )
      return res.status(400).json({
        error: 'Password must be at least 6 characters long.',
      });
    if (
      !username ||
      !validator.isLength(username, {
        min: 3,
      })
    )
      return res.status(400).json({
        error: 'Username must be at least 3 characters long.',
      });
    if (!apiKey)
      return res.status(400).json({
        error: 'API key is required.',
      });

    const existingUser = await User.findOne({
      email,
    });
    if (existingUser)
      return res.status(400).json({
        error: 'User with this email already exists.',
      });
    const existingKey = await User.findOne({
      apiKey,
    });
    if (existingKey && existingKey.apiKey === apiKey)
      return res.status(400).json({
        error: 'User with this apiKey already exists.',
      });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      apiKey,
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();

    const accessToken = jwt.sign(
      {
        email,
      },
      'Konbanwa',
      {
        expiresIn: '15m',
      }
    );

    const verificationUrl = `${req.protocol}://${req.get('host')}/verify/${accessToken}`;

    await sendVerificationEmail(email, verificationUrl);

    res.send('Check email for verification');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
}

async function getUserProfile(req, res) {
  try {
    const { email, password } = req.query;

    const user = await User.findOne({
      email,
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({
        error: 'Invalid email or password.',
      });

    res.json({
      email: user.email,
      username: user.username,
      limit: user.limit,
      status: user.status,
      apiKey: user.apiKey,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
}

async function checkApiKey(req, res) {
  const { key } = req.query;
  const user = await User.findOne({
    apiKey: key,
  });

  if (!user)
    return res.status(400).json({
      error: 'Invalid API key.',
    });

  res.json({
    limit: user.limit,
  });
}

export default router;
