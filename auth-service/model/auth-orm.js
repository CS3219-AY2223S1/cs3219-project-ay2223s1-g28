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
export const getUser = async (usernameOrEmail) => {
  return await getUserByUsername(usernameOrEmail) 
    || await getUserByEmail(usernameOrEmail); // Allow signin using email too
};

// Returns true if password is correct, else false
export const checkPassword = async (userPassword, password) => {
  return await bcrypt.compare(password, userPassword);
};

export const generateJwt = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION });
};

export const blacklistJwt = async (token) => {
  await client.setEx(`bl_${token}`, JWT_EXPIRATION, token);
};

export const getBlacklistedJwt = async (token) => {
  return await client.get(`bl_${token}`);
};
