import redis from '../config/redisClient.js';

const CACHE_EXPIRY = 7200; // Cache expires in 2 hour

// Get data from cache
export const getCachedData = async (key) => {
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Redis Get Error:', error);
        return null;
    }
};

// Set data in cache
export const setCachedData = async (key, value, expiry = CACHE_EXPIRY) => {
    try {
        await redis.set(key, JSON.stringify(value), 'EX', expiry);
    } catch (error) {
        console.error('Redis Set Error:', error);
    }
};

// Clear cache
export const clearCache = async (key) => {
    try {
        await redis.del(key);
    } catch (error) {
        console.error('Redis Delete Error:', error);
    }
};
