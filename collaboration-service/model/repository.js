import 'dotenv/config';
import redis from 'redis';

const EXPIRATION = 7200; // 2 hrs

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

client.on('error', err => {
    console.log('Redis error ' + err);
});

export async function setCode(roomId, code) {
    const key = `room_${roomId}`;
    await client.setEx(key, EXPIRATION, code);
}

export async function getCode(roomId) {
    return await client.get(`room_${roomId}`);
}
