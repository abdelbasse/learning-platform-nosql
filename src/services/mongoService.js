// Question: Pourquoi créer des services séparés ?
// Réponse: 
/*
          Créer des services séparés pour des bases de données comme MongoDB et Redis rend 
          l'application plus facile à gérer, comprendre et étendre. En préparant des services
          spécifiques pour chaque base de données, comme l'ajout de fonctions générales 
          pour modifier, supprimer ou des fonctions personnalisées comme l'agrégation dans
          MongoDB, vous gardez le code organisé et modulaire. Cela rend l'application plus
          évolutive et maintenable. Par exemple, si vous devez mettre à jour ou ajouter 
          de nouvelles fonctionnalités à MongoDB, vous pouvez facilement modifier ou 
          ajouter des fonctions sans affecter le service Redis, garantissant ainsi que 
          chaque service est isolé. Cette approche améliore la flexibilité, la 
          réutilisabilité et les tests, tout en rendant la structure du code plus claire 
          et plus facile à modifier.
*/

const { ObjectId } = require('mongodb');
const dbConnection = require('../config/db');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    // First, check Redis cache
    const cachedData = await redisService.getData(`course:${id}`);
    if (cachedData) {
      console.log('Data retrieved from Redis cache');
      return JSON.parse(cachedData);  // Redis stores data as string, so we parse it back to JSON
    }

    // If not in cache, connect to MongoDB and query the database
    await dbConnection.connectMongo();
    const db = dbConnection.getDb();
    const result = await db.collection(collection).findOne({ _id: new ObjectId(id) });
    if (!result) {
      throw new Error('Document not found');
    }

    // Cache the result in Redis for future use
    await redisService.cacheData(`course:${id}`, result, 3600); // Cache data for 1 hour (3600 seconds)

    return result;
  } catch (error) {
    console.error(`Error in findOneById: ${error.message}`);
    throw error; // Rethrow the error to be handled by the calling code
  }
}

// Function to insert a document into a collection
async function insertOne(collection, document) {
  try {
    await dbConnection.connectMongo();
    const db = dbConnection.getDb();
    const result = await db.collection(collection).insertOne(document);
    
    if (result.acknowledged) {
      console.log('Document inserted with ID:', result.insertedId);
      return result.insertedId;
    } else {
      throw new Error('Insert operation failed');
    }
  } catch (error) {
    console.error(`Error in insertOne: ${error.message}`);
    throw error; // Rethrow the error to be handled by the calling code
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  insertOne
};