# Taoudi Abdelbasset (BDCC2)

## Setup Env
Here are the command lines to install MongoDB and Redis:

**MongoDB Installation:**
```bash
npm install mongodb
```

**Redis Installation:**
```bash
npm install redis
```

---
---
---

Yes, you can definitely read the `.env` file directly without creating a separate `env.js` file. The `dotenv` package allows you to load environment variables directly into your project, and you can access them throughout your application without needing an additional `env.js` file.

Here’s how to do it:

### **1. Install `dotenv`**
If you haven't installed it already, run:
```bash
npm install dotenv
```

### **2. Read `.env` File Directly in `db.js`**
In your `db.js`, you can directly load the `.env` variables by requiring `dotenv` at the top of your file.

#### Example:
```javascript
require('dotenv').config();
const { MongoClient } = require('mongodb');
const redis = require('redis');

let mongoClient, redisClient, db;

// MongoDB connection
async function connectMongo() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB_NAME;

    if (!mongoUri) throw new Error('MONGODB_URI is not defined');
    if (!dbName) throw new Error('MONGODB_DB_NAME is not defined');

    mongoClient = new MongoClient(mongoUri, { useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(dbName);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Redis connection
async function connectRedis() {
  try {
    const redisUri = process.env.REDIS_URI;

    if (!redisUri) throw new Error('REDIS_URI is not defined');

    redisClient = redis.createClient({ url: redisUri });
    await redisClient.connect();
    console.log('Connected to Redis successfully!');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
}

// Close connections
async function closeConnections() {
  if (mongoClient) await mongoClient.close();
  if (redisClient) await redisClient.quit();
  console.log('Connections closed.');
}

// Export functions and clients
module.exports = {
  connectMongo,
  connectRedis,
  closeConnections,
  getDb: () => db,
};
```

### **3. .env File**
Ensure your `.env` file is correctly set up in the root directory of your project:
```
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=learning_platform
REDIS_URI=redis://localhost:6379
PORT=3000
```

### **4. Run Your Test**
Now, you can run your test script, and it will read the `.env` file automatically:
```bash
node tests/dbTest.js
```

### **5. Why This Works**
By calling `require('dotenv').config()` at the start of your application, all environment variables from the `.env` file are loaded into `process.env`. This allows you to directly access them using `process.env.MONGODB_URI`, `process.env.MONGODB_DB_NAME`, and other variables.

Let me know if this works or if you need further assistance! 😊
