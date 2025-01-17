// Import the env.js module
const { mongodb, redis, port } = require('../src/config/env'); // Adjust path as necessary

// Print out the values from the env.js file to check if they're correctly loaded
console.log('MONGODB_URI:', mongodb.uri);
console.log('MONGODB_DB_NAME:', mongodb.dbName);
console.log('REDIS_URI:', redis.uri);
console.log('PORT:', port);
