const redisService = require('./../src/services/redisService');
const mongoService = require('./../src/services/mongoService');

// Function for Redis service test
async function redisServiceTest() {
  const key = 'user:1234';
  const value = { name: 'Hassan' };  
  const ttl = 60;  

  try {    
    console.log('Caching data...');
    await redisService.cacheData(key, value, ttl);
    console.log('Data cached with key:', key);
    
    console.log('Waiting for 1 minute before retrieving data...');

    setTimeout(async () => {
        const retrievedData = await redisService.getData(key);
        if (retrievedData) {
            console.log('Retrieved data:', retrievedData);
        } else {
            console.log('Data not found (may have expired).');
        }
        console.log("\n\nENDD");
    }, 10000);  // 10s

    setTimeout(async () => {
      const retrievedData = await redisService.getData(key);
      if (retrievedData) {
        console.log('Retrieved data:', retrievedData);
      } else {
        console.log('Data not found (may have expired).');
      }
      console.log("\n\nENDD");
    }, 60000);  // 1min
    
  } catch (error) {
    console.error('Error during test:', error);
  }
}

// Function for MongoDB service test
async function mongoServiceTest() {
  const collection = 'users';
  const testDocument = { name: 'John', age: 30, city: 'Mohammedia' };

  try {
    console.log('Inserting document...');
    const insertedId = await mongoService.insertOne(collection, testDocument);
    console.log('Inserted document ID:', insertedId);

    console.log('Searching for document by ID...');
    const retrievedDocument = await mongoService.findOneById(collection, insertedId);
    console.log('Retrieved document:', retrievedDocument);
    
    console.log("\n\nENDD");
  } catch (error) {
    console.error('Error during test:', error);
  }
}

// Execute the tests sequentially
async function runTests() {
  await mongoServiceTest();  // Wait until MongoDB test completes
  await redisServiceTest();  // Run Redis test after MongoDB test is done
}

// Run the tests
runTests();
