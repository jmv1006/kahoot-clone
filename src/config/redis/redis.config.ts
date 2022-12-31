import { createClient, RedisClientType } from 'redis';

const client : RedisClientType = createClient({url: process.env.REDIS_URL});

client.on('connect', () => console.log("Successfully Connected To Redis"));

const connectToRedis = async () => {
    await client.connect()
}

const getClient = () => {
    return client;
}

export {connectToRedis, getClient}