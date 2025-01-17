// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : 
/*
          A mon avis, créer un fichier pour la connexion à la base de données et utiliser ce fichier
           dans d'autres parties du projet est bien meilleur que de faire en sorte que chaque fichier
            établisse sa propre connexion. Par exemple, si le nom de la base de données, les identifiants
             root ou toute autre configuration changent, il suffira de modifier la connexion dans 
             un seul fichier au lieu de modifier plusieurs fichiers. Cela rend le projet plus facile 
             à maintenir, fait gagner du temps et aide à éviter la confusion, surtout lorsqu'on travaille 
             en équipe. Cela permet également de garder le code plus propre et plus compréhensible.
*/
// ------------------------------------------------------------------------------------------------------------------------------------------------
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 
/*
          Pour fermer correctement les connexions, vous devez vous assurer qu'il n'y a pas 
          d'opérations en cours (comme des tâches incomplètes). S'il y a des opérations en attente, 
          continuez à vérifier jusqu'à ce que les deux connexions soient fermées en toute sécurité. 
          Ainsi, si quelque chose ne va pas (comme une tâche incomplète), le programme continuera à 
          vérifier et attendra que tout soit terminé avant de fermer les connexions, garantissant 
          ainsi qu'aucune donnée ne soit perdue ou corrompue.
*/
// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    console.log('MongoDB URI:', config.mongodb.uri);
    console.log('Database Name:', config.mongodb.dbName);

    if (!config.mongodb.uri) throw new Error('mongodb uri is not defined');
    if (!config.mongodb.dbName) throw new Error('mongodb dbName is not defined');

    mongoClient = new MongoClient(config.mongodb.uri, { useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);

    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;  
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  try {
    if (!config.redis.uri) throw new Error('Redis URI is not defined');
    
    redisClient = redis.createClient({
      url: config.redis.uri
    });
    
    redisClient.on('connect', () => {
      console.log('Connected to Redis successfully!');
    });

    redisClient.on('error', (err) => {
      console.error('Error connecting to Redis:', err);
    });
    
    await redisClient.connect();
  } catch (error) {
    console.error('Error connecting to Redis:', error);
    throw error; 
  }
}

// Function to close both MongoDB and Redis connections
async function closeConnections() {
  try {
    // Close MongoDB connection if it's open
    if (mongoClient) {
      await mongoClient.close();
      console.log('MongoDB connection closed');
    }

    // Close Redis connection if it's open and still connected
    if (redisClient && redisClient.isOpen) {
      await redisClient.quit();
      console.log('Redis connection closed');
    } else {
      console.log('Redis client is already closed or was never connected');
    }
  } catch (error) {
    console.error('Error while closing connections:', error);
  }
}


// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  closeConnections,
  getDb: () => db,
  getRedisClient: () => redisClient,
};