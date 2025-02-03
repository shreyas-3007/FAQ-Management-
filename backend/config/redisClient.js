// const { createClient } = require('redis');

// const client = createClient({
//     url: process.env.REDIS_URL || 'redis://localhost:6379', // Default Redis URL
// });

// client.on('error', (err) => console.error('Redis Error:', err));

// (async () => {
//     try {
//         await client.connect(); // Connecting asynchronously
//         console.log('CONNECTED TO REDIS');
//     } catch (err) {
//         console.error('Redis Connection Failed:', err);
//     }
// })();

// module.exports = client;


const { createClient } = require('redis');

const REDIS_HOST = process.env.REDIS_HOST || 'localhost'; 
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = createClient({
    //url: `redis://${REDIS_HOST}:${REDIS_PORT}`  // IF using Docker 
    url: `redis://localhost:6379`     // Manual Config
}); 

client.on('error', (err) => console.error('Redis Error:', err));

(async () => {
    try {
        await client.connect();
        console.log(`Connected to Redis at ${REDIS_HOST}:${REDIS_PORT}`);
    } catch (err) {
        console.error('Redis Connection Failed:', err);
    }
})();

module.exports = client;
