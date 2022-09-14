import 'dotenv/config';
import jwt from 'jsonwebtoken';
import redis from 'redis';

const EXPIRATION = 86400; // 24hrs

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_CLOUD_HOST,
        port: process.env.REDIS_CLOUD_PORT
    },
    password: process.env.REDIS_CLOUD_PASSWORD
});

await client.connect();

client.on('error', err => {
    console.log('Redis error ' + err);
});

export function generateJwt(user) {
    const username = user.username;
    return jwt.sign({'username': username}, process.env.JWT_SECRET_KEY, { expiresIn: EXPIRATION });
}

export async function blacklistJwt(token) {
    const key = `bl_${token}`;
    await client.setEx(key, EXPIRATION, token);
}

export async function authenticateJwt(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    const isBlacklisted = await client.get(`bl_${token}`);
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Please sign in again.' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
            return res.status(401).json({ message: 'Invalid token.' })
        }

        req.token = token;
        next();
    })
}
