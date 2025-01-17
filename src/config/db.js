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
// './env' indicates we need to create an env.js file, which will read values from the .env file without exposing sensitive data during commits or pushes.
const config = require('./env');      

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    console.log('MongoDB URI:', config.MONGODB_URI);
    console.log('Database Name:', config.MONGODB_DB_NAME);

    if (!config.MONGODB_URI) throw new Error('MONGODB_URI is not defined');
    if (!config.MONGODB_DB_NAME) throw new Error('MONGODB_DB_NAME is not defined');

    mongoClient = new MongoClient(config.MONGODB_URI, { useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(config.MONGODB_DB_NAME);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles

  connectMongo
};