# Final Project: Learning Platform Backend with NoSQL

## Developed by: **TAOUDI Abdelbasset DBCC2**

---
## Project Description

This project involves building a backend API for an online learning platform using NoSQL databases. The API handles courses, students, and other platform-related functionalities. Emphasis is placed on professional code organization, best practices, and managing data using MongoDB and Redis.

### Key Features

- CRUD operations for courses, students , future featurs.
- MongoDB as the primary database for data storage.
- Redis for caching and other specific functionalities.
- Error handling and thorough documentation.

---
## Environment Configuration

### Why use Environment Variables?

Environment variables manage sensitive information and environment-specific configurations securely and flexibly. Benefits include:

- **Security**: Prevent exposing sensitive data in source code.
- **Flexibility**: Adapt configurations for different environments (development, testing, production).
- **Portability**: Simplify deployment on different servers.
- **Clarity**: Centralize configurations for easier maintenance.

Here’s an updated version of the _Environment Configuration_ section, highlighting the role of each environment variable and emphasizing the importance of naming conventions.

---
## Environment Configuration
### Essential Environment Variables and Their Role

Here’s an overview of the critical environment variables, their roles, and the importance of using descriptive names:

1. **MONGODB_URI**:
    
    - **Role**: Specifies the connection URI for the MongoDB database.
    - **Importance**: The name clearly indicates it is related to MongoDB connection settings. Ensure this URI points to the correct environment-specific database to avoid potential issues with production and development data.
2. **MONGODB_DB_NAME**:
    
    - **Role**: Specifies the name of the database within MongoDB.
    - **Importance**: By giving this variable a clear, distinct name, it prevents confusion when switching between multiple databases, ensuring the correct one is used in different environments.
3. **REDIS_URI**:
    
    - **Role**: Defines the connection URI for the Redis instance.
    - **Importance**: The `REDIS_URI` name clearly signals that it relates to Redis. Using a specific URI is crucial for directing traffic to the appropriate caching server, especially in clustered or multi-region setups.
4. **PORT**:
    
    - **Role**: Indicates the port number for the API to run on.
    - **Importance**: By using an environment variable for the port, you can change the server's listening port based on the environment, avoiding conflicts with other applications or services on the same host.

### Example `.env` Configuration

The `.env` file should contain all sensitive or environment-specific information. Here’s an example:

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=learning_platform_db
REDIS_URI=redis://localhost:6379
PORT=3000
```

- **MONGODB_URI**: Points to the local MongoDB instance.
- **MONGODB_DB_NAME**: Specifies the database name for this project.
- **REDIS_URI**: Connects to the Redis server running locally.
- **PORT**: Sets the application to listen on port `3000` for the local development environment.

---
## File Organization and Structure

### Why Separate Code into Modules?

- **Maintainability**: Simplify understanding and modifying code.
- **Reusability**: Enable code reuse across modules and tests.
- **Scalability**: Facilitate adding new features or components.
- **Testability**: Modular code is easier to test and debug.

### Project Directory Structure

```
LEARNING-PLATFORM-BACKEND/
├── img/                        # Images for documentation and testing.
├── node_modules/               # Installed Node.js modules.
├── src/                        # Source code.
│   ├── config/                 # Database and environment configurations.
│   │   ├── db.js               # MongoDB connection setup.
│   │   └── env.js              # Environment variable validation.
│   ├── controllers/            # API logic for specific entities.
│   │   ├── courseController.js
│   │   └── studentController.js
│   ├── routes/                 # API endpoint routes.
│   │   ├── courseRoutes.js
│   │   └── studentRoutes.js
│   ├── services/               # Reusable service logic.
│   │   ├── mongoService.js     # MongoDB-related services.
│   │   └── redisService.js     # Redis-related services.
│   ├── tests/                  # Test files.
│   │   └── 00.....             # Test Files of main functions
└── app.js                      # Main application entry point.
```

---

## Backend Functionality Details
### Course Management
- **Features**:
    - Create  and read courses.
    - Store course information such as name and description.
### Student Management
- **Features**:
    - Retrieve student details (name, email, date of birth, gender).
### Caching with Redis
- **Best Practices**:
    - Use structured key naming (e.g., `app:module:resource:id`).
    - Set appropriate TTLs (Time-To-Live) to avoid outdated data.
    - Implement cache invalidation for updated or deleted records.

---
Here’s an updated section for *Testing and Validation*, reflecting the changes you’ve made:

---
## Testing and Validation
### Testing Interfaces
Relying on simple Node.js scripts and command-line tools are used to validate various functionalities of the backend system. These include:

- **Testing the Environment**: A Node.js script to check if environment variables are correctly set up.
![envTesting](./documentation/images/Screenshot%202025-01-17%20202710.png)
- **Testing the Database**: A script that verifies the connection and performs simple database operations on MongoDB.
![DBTesting](./documentation/images/Screenshot%202025-01-17%20202754.png)
- **Testing the Services**: A Node.js script to test the reusable logic in the services (e.g., MongoDB and Redis operations).
![ServiceTesting](./documentation/images/Screenshot%202025-01-17%20202720.png)
- **Command-line API Testing  (cURL)**: Use of `curl` to test if the API is functioning correctly by hitting various endpoints. Example:
  ```bash
  curl http://localhost:3000/courses
  ```
  This checks if the API is responding correctly for course-related endpoints.
  ![API](./documentation/images/Screenshot%202025-01-17%20223058.png)

---
Here’s an updated *Deployment Guide* with detailed step-by-step instructions for installing Node.js, MongoDB, and Redis:

---
## Deployment Guide
### Prerequisites
1. **Install Node.js and npm**:  
   Node.js is required to run the backend server, and npm (Node Package Manager) is used to install dependencies.

   - Go to the official Node.js website: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
   - Download and install the recommended version for your operating system.
   - Verify the installation by running:
     ```bash
     node -v
     npm -v
     ```

2. **Install MongoDB**:  
   MongoDB is the primary database for storing data.

   - Follow the official MongoDB installation guide for your platform:  
     [MongoDB Installation on Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

   - Install MongoDB using npm run:
     ```bash
     npm install mongodb
     ```

3. **Install Redis**:  
   Redis is used for caching and other specific functionalities.

   - Follow the official Redis installation guide for Windows:  
     [Install Redis on Windows](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/)

   - For Linux users, use the following commands to install Redis:

   ```bash
   curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

   echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

   sudo apt-get update
   sudo apt-get install redis
   ```

   - Start the Redis server with:
   ```bash
   sudo service redis-server start
   ```

   - Check the Redis server status:
   ```bash
   sudo service redis-server status
   ```
   >[Note]:
   > for windows use **WSL** and run the commands

4. **Install Redis npm package**:  
   After setting up Redis, install the Redis client for Node.js:
   ```bash
   npm install redis
   ```

---

### Steps to Deploy

1. Clone the project:
    ```bash
    git clone https://github.com/YourRepo/learning-platform-nosql.git
    cd learning-platform-nosql
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure `.env` file with required variables (Refer to the *Environment Configuration* section for required variables like `MONGODB_URI`, `REDIS_URI`, and `PORT`).

4. Start the application:
    ```bash
    npm start
    ```
    or
    ```bash
    node src/app.js
    ```

5. Access the API at [http://localhost:3000](http://localhost:3000/).

By following these steps, you’ll have the backend application up and running with Node.js, MongoDB, and Redis. Make sure to double-check the `.env` file to ensure all necessary environment variables are properly configured.

---

## Conclusion

This project showcases a robust backend system for an online learning platform. By leveraging NoSQL databases (MongoDB and Redis) and adhering to best practices, it ensures scalability, performance, and maintainability. Future improvements can include:

- Integration of user authentication.
- add modal folder to present collections and documents, for easy process (like add instead putting json in parameter we will put object and we get object ect ect).
- Adding analytics and reporting.
- Enhancing frontend interfaces.
- Add token for accessing the restAPI.
- add extra feature in the controllers and services.