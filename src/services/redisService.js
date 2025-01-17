// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
/*
            Pour bien gérer le cache avec Redis, donnez un temps d'expiration aux données 
            mises en cache afin qu'elles ne restent pas trop longtemps. Vous pouvez aussi 
            configurer Redis pour supprimer automatiquement les anciennes données lorsque 
            la mémoire est pleine. Par exemple, utilisez SET key value EX 3600 pour 
            définir une clé avec une expiration d'1 heure. Organisez bien vos données en 
            utilisant des structures simples comme des chaînes de caractères ou des listes
            our des hash.
*/ 
// ------------------------------------------------------------------------------------------------------------------------------------------------
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :
/*
            Les bonnes pratiques pour les clés Redis incluent l'utilisation de noms de 
            clés clairs et courts. Par exemple, utilisez cour:1234 au lieu de simplement 
            1234 pour rendre les choses plus compréhensibles. Évitez d'utiliser des 
            informations sensibles dans les clés. L'utilisation de préfixes comme 
            cache:cour:1234 aide à organiser les choses.
*/ 
// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------

// const redis = require('redis');
const dbConnection = require('../config/db');

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
    // TODO: Implémenter une fonction générique de cache
    try {
      const redisClient = dbConnection.getRedisClient();
      if (!redisClient.isOpen) {
        console.error('Redis client is not connected');
        return;
      }
  
      await redisClient.setEx(key, ttl, JSON.stringify(data));
      console.log(`Data cached with key: ${key}, TTL: ${ttl} seconds`);
    } catch (error) {
      console.error('Error caching data in Redis:', error);
      throw error;
    }
  }

// Fonction pour récupérer des données de Redis
async function getData(key) {
  try {
    const redisClient = dbConnection.getRedisClient(); 
    if (!redisClient.isOpen) {
      console.error('Redis client is not connected');
      return;
    }
    const data = await redisClient.get(key);
    
    if (data) {
      console.log(`Data found for key: ${key}`);
      return JSON.parse(data);  
    } else {
      console.log(`No data found for key: ${key}`);
      return null;  
    }
  } catch (error) {
    console.error('Error retrieving data from Redis:', error);
    return null;  
  }
}
  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData,
    getData
  };