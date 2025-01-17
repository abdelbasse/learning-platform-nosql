const { connectMongo, connectRedis, closeConnections } = require('../src/config/db');

(async function testConnections() {
  console.log('\n\n\n> Starting database connection tests...');

  try {
    await connectMongo();

    await connectRedis();

    console.log('\n\n\n> Both MongoDB and Redis connections were successful!');
  } catch (error) {
    console.error('\n\n\n> Error during the database connection tests:', error);
  } finally {
    await closeConnections();
    console.log('\n\n\n> Connections closed successfully.');
  }
})();
