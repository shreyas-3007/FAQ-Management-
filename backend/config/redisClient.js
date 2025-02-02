const { createClient } = require('redis');

const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379', // Default Redis URL
});

client.on('error', (err) => console.error('Redis Error:', err));

(async () => {
    try {
        await client.connect(); // Connecting asynchronously
        console.log('CONNECTED TO REDIS');
    } catch (err) {
        console.error('Redis Connection Failed:', err);
    }
})();

module.exports = client;
