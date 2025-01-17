const { connectMongo } = require('../src/config/db');

(async function testConnections() {
  console.log('Starting database connection tests...');

  // Test MongoDB connection
  await connectMongo();

})();
