// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : 
/*
            Pour cela, nous devons les valider afin de nous assurer que nous avons toutes les 
            données nécessaires pour nous connecter à nos bases de données, Mongo et Redis. 
            Cela nous permet de générer des exceptions d'erreur ici, ce qui rend les choses plus 
            faciles et réduit la gestion des erreurs dans le fichier qui gérera la connexion 
            or autre proccess.
*/
// ------------------------------------------------------------------------------------------------------------------------------------------------
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : 
/*
            Si la variable n'est pas trouvée, une exception sera levée, et tous les autres 
            processus qui en ont besoin ne fonctionneront pas tant que toutes les variables 
            ne sont pas vérifiées. Ainsi, nous réduisons la gestion des erreurs.
*/ 
// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------


const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
  // Si une variable manque, lever une erreur explicative
}

validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};