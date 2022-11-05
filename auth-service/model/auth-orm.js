import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redis from 'redis';

import { getUserByUsername, getUserByEmail } from './auth-repo.js';

export const JWT_EXPIRATION = 86400; // 24hrs in seconds

// Redis setup
const redisClientOptions = process.env.ENV === 'PROD'
  ? {
    socket: {
      host: process.env.REDIS_CLOUD_HOST,
      port: process.env.REDIS_CLOUD_PORT,
    },
    password: process.env.REDIS_CLOUD_PASSWORD,
  }
  : {
    url: process.env.REDIS_DOCKER_URL
  };
const client = redis.createClient(redisClientOptions);
await client.connect();
client.on('error', err => console.log('Redis connection error: ' + err));

// Returns the corresponding user, or null if does not exist
const checkExistence = async (usernameOrEmail) => {
  return await getUserByUsername(usernameOrEmail) 
    || await getUserByEmail(usernameOrEmail); // Allow signin using email too
};

// Returns true if user exists and password is correct, else false
export const checkPassword = async (usernameOrEmail, password) => {
  // Check if user exists
  const user = await checkExistence(usernameOrEmail);
  if (!user) {
    return false;
  }

  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  return isPasswordCorrect;
};

export const generateJwt = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION });
};

export const blacklistJwt = async (token) => {
  await client.setEx(`bl_${token}`, JWT_EXPIRATION, token);
};

export const getBlacklistedJwt = async (token) => {
  return await client.get(`bl_${token}`);
};
