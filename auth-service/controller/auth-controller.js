import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { 
  checkPassword,
  generateJwt,
  getBlacklistedJwt,
  blacklistJwt, 
} from '../model/auth-orm.js';

const COOKIE_EXPIRATION = 86400000; // 24hrs in milliseconds

// Returns an acess token upon successful sign in, else the corresponding error message
export const signin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (usernameOrEmail && password) {
      // Check if password is correct
      const isPasswordCorrect = await checkPassword(usernameOrEmail, password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'User does not exist and/or wrong password.' });
      }

      // Create JWT
      const token = generateJwt(usernameOrEmail);

      // Set cookie
      res.cookie('token', token, { 
        httpOnly: true,
        maxAge: COOKIE_EXPIRATION, // milliseconds
      });
      return res.status(200).json({ message: 'Signed in successfully.' });
    } else {
      return res.status(400).json({ message: 'Missing username and/or password.' });
    }
  } catch (_) {
    return res.status(500).json({ message: 'Server error when signing in user.' });
  }
};

export const signout = async (req, res) => {
  try {
    // Clear token
    const token = req.cookies.token;
    token && await blacklistJwt(token);

    // Clear cookie
    res.clearCookie('token');

    return res.status(200).json({ message: 'Signed out successfully.' })
  } catch (_) {
    return res.status(500).json({ message: 'Server error when signing out user.' });
  }
};

export const authenticate = async (req, res) => {
  try {
    // Retrieve token
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }
  
    // Check token validity
    const isBlacklisted = await getBlacklistedJwt(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Please sign in again.' });
    }
  
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
  
      // Refresh token and cookie
      const token = generateJwt(user.user);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: COOKIE_EXPIRATION, // milliseconds
      });
  
      return res.status(200).json({ user: user.user });
    })
  } catch (_) {
    return res.status(500).json({ message: 'Server error when authenticating user.' });
  }
};
