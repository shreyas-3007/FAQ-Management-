const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379' // Default Redis URL
});

client.on('error', (err) => console.error('Redis Error:', err));

client.connect()
    .then(() => console.log('CONNECTED TO REDIS'))
    .catch((err) => console.error('Redis Connection Failed:', err));

module.exports = client;
