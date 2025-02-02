const redis = require('../config/redisClient'); // Using CommonJS for import
const CACHE_EXPIRY = 7200; // Cache expires in 2 hours

// Get data from cache
const getCachedData = async (key) => {
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Redis Get Error:', error);
        return null;
    }
};

// Set data in cache
// Set data in cache (ensure it's always an array)
const setCachedData = async (key, value, expiry = CACHE_EXPIRY) => {
    try {
      if (!Array.isArray(value)) {
        value = [value];  // Wrap in array if it is not already an array
      }
      await redis.set(key, JSON.stringify(value), 'EX', expiry);
    } catch (error) {
      console.error('Redis Set Error:', error);
    }
  };
  

// Clear specific cache key
const clearCache = async (key) => {
    try {
        await redis.del(key);
    } catch (error) {
        console.error('Redis Delete Error:', error);
    }
};

module.exports = { getCachedData, setCachedData, clearCache }; // Exporting methods using CommonJS
