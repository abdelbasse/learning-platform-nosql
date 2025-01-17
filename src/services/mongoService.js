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
// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------

const { ObjectId } = require('mongodb');
const dbConnection = require('../config/db');

// Fonctions utilitaires pour MongoDB

async function getAllDocuments(collectionName) {
  try {
    const db = dbConnection.getDb();
    
    const documents = await db.collection(collectionName).find().toArray();
    
    if (!documents || documents.length === 0) {
      throw new Error('No documents found in the collection');
    }

    return documents;
  } catch (error) {
    console.error(`Error in getAllDocuments: ${error.message}`);
    throw error;
  }
}

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    const db = dbConnection.getDb();
    const result = await db.collection(collection).findOne({ _id: new ObjectId(id) });
    if (!result) {
      throw new Error('Document not found');
    }

    return result;
  } catch (error) {
    console.error(`Error in findOneById: ${error.message}`);
    throw error;
  }
}

// Function to insert a document into a collection
async function insertOne(collection, document) {
  try {
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
    throw error;
  }
}

async function countDocuments(collection) {
  try {
    const db = dbConnection.getDb();
    const count = await db.collection(collection).countDocuments();
    return count;
  } catch (error) {
    console.error(`Error in countDocuments: ${error.message}`);
    throw error; 
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  insertOne,
  getAllDocuments
};