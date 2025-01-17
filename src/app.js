// Question: Comment organiser le point d'entrée de l'application ?
/*
        Le point d'entrée est l'endroit où votre application commence. Il est important 
        de le garder simple. Dans ce fichier, vous configurez tout ce dont l'application 
        a besoin pour fonctionner, comme la connexion aux bases de données, l'ajout de 
        fonctionnalités (middleware) et la configuration des routes. Habituellement, ce
        fichier est appelé app.js ou server.js. Vous ne voulez pas mettre trop de code 
        dans ce fichier ; assurez-vous juste qu'il organise et lance les parties importantes 
        de l'application.
*/
// ------------------------------------------------------------------------------------------------------------------------------------------------
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
/*
        La meilleure façon de gérer le démarrage de votre application est de vous assurer que
        tout ce dont elle a besoin est prêt avant de commencer à fonctionner. Cela signifie 
        connecter les bases de données, configurer l'environnement et charger les bons paramètres.
        Vous pouvez utiliser des fonctions pour configurer ces éléments un par un. Si vous utilisez
        un framework web comme Express, il peut vous aider à faire cela de manière organisée. 
        Assurez-vous que toutes les tâches, comme la connexion aux bases de données, sont 
        terminées avant que l'application ne commence à accepter les requêtes.
*/
// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------


const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();
    // TODO: Configurer les middlewares Express
    app.use(express.json()); 
    // TODO: Monter les routes
    // [Note : any rout in courseRoutes will be accessed by the '/courses/'${rout_name} ]
    app.use('/courses', courseRoutes); 
    // [Note : any rout in studentRoutes will be accessed by the '/students/'${rout_name} ]
    app.use('/students', studentRoutes);
    // TODO: Démarrer le serveur
    const port = config.port || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message || error);
    process.exit(1);  
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  console.log('Received SIGTERM, shutting down gracefully...');
  try {
    await db.closeConnections(); 
    console.log('Database connections closed.');
    process.exit(0);  
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);  
  }
});

startServer();