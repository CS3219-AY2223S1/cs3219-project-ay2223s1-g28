import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { 
  getUser,
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
      // Check if user exists
      const user = await getUser(usernameOrEmail);
      if (!user) {
        // Vague message for privacy concerns
        return res.status(401).json({ message: 'User does not exist and/or wrong password.' });
      }

      // Check if password is correct
      const isPasswordCorrect = await checkPassword(user.password, password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'User does not exist and/or wrong password.' });
      }

      // Create JWT
      const token = generateJwt(user.username);

      // Set cookie
      res.cookie('token', token, { 
        httpOnly: true,
        maxAge: COOKIE_EXPIRATION, // milliseconds
        sameSite: 'none', 
        secure: true,
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
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
  
      // Refresh token and cookie
      const token = generateJwt(data.username);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: COOKIE_EXPIRATION, // milliseconds
        sameSite: 'none',
        secure: true,
      });
  
      return res.status(200).json({ username: data.username });
    })
  } catch (_) {
    return res.status(500).json({ message: 'Server error when authenticating user.' });
  }
};
