import 'dotenv/config';
import redis from 'redis';

const EXPIRATION = 86400; // 24hrs

const redisClientOptions =
  process.env.ENV === 'PROD'
    ? {
        socket: {
          host: process.env.REDIS_CLOUD_HOST,
          port: process.env.REDIS_CLOUD_PORT,
        },
        password: process.env.REDIS_CLOUD_PASSWORD,
      }
    : {};

const client = redis.createClient(redisClientOptions);

await client.connect();

client.on('error', err => {
    console.log('Redis error ' + err);
});

export async function blacklistJwt(token) {
    const key = `bl_${token}`;
    await client.setEx(key, EXPIRATION, token);
}

export async function getBlacklistedJwt(token) {
    return await client.get(`bl_${token}`);
}
