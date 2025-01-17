// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
/*
            Une route est un point d'URL qui gère des requêtes HTTP spécifiques comme 
            GET, POST ou DELETE. Un contrôleur est responsable de la gestion de la logique
            derrière ces requêtes, comme le traitement des données et l'interaction avec 
            les services ou la base de données. En séparant les routes des contrôleurs,
            vous rendez votre code plus propre et plus organisé, car les routes définissent
            simplement l'URL et la méthode HTTP, tandis que les contrôleurs gèrent la 
            logique métier.
*/
// ------------------------------------------------------------------------------------------------------------------------------------------------
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :
/*
            Séparer la logique métier des routes rend le code plus organisé, facile à 
            maintenir et évolutif. Cela permet de modifier la logique en un seul endroit
            sans affecter les routes. Si vous devez changer la manière dont les données 
            sont traitées ou ajouter de nouvelles fonctionnalités, vous pouvez le faire 
            dans le contrôleur, en gardant les routes propres et concentrées uniquement 
            sur la gestion des requêtes HTTP. Cela améliore également la réutilisabilité, 
            les tests et le débogage, car chaque partie du système a une responsabilité 
            claire.
*/ 
// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function getAllCourses(req, res) {
  try {
    // Connect to MongoDB
    const dbInstance = db.getDb();

    // Access the 'courses' collection and retrieve all documents
    const coursesCollection = dbInstance.collection('courses');
    const courses = await coursesCollection.find({}).toArray();

    // Send the result as a response
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error('Error retrieving courses:', error);

    // Handle errors
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve courses',
    });
  }
}

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const { courseName, description, instructor } = req.body;

    if (!courseName || !description || !instructor) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a course object
    const course = {
      courseName,
      description,
      instructor,
      createdAt: new Date(),
    };

    // Insert the course using the mongoService
    const newCourse = await mongoService.create('courses', course);
    
    // Optionally cache the course data in Redis (with a TTL)
    await redisService.cacheData(`course:${newCourse._id}`, newCourse, 3600);

    return res.status(201).json({
      message: 'Course created successfully',
      course: newCourse,
    });

  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({ message: 'Failed to create course', error: error.message });
  }
}

async function getCourse(req, res) {
  try {
    const { id } = req.params;

    // Check if the course is in the Redis cache
    const cachedCourse = await redisService.getData(`course:${id}`);
    if (cachedCourse) {
      console.log('Course retrieved from Redis cache');
      return res.status(200).json(JSON.parse(cachedCourse)); // Return the cached data
    }

    // If not in the cache, fetch it from MongoDB
    const course = await mongoService.findOneById('courses', id);
    res.status(200).json(course);

  } catch (error) {
    console.error(`Error fetching course: ${error.message}`);
    res.status(500).json({ message: 'Error fetching course', error: error.message });
  }
}

async function getCourseStats(req, res) {
  try {
    // prefer not to save the count in cash due the count can be change anytime so it's not good practice to get the count using redis 
    const courseCount = await mongoService.countDocuments('courses');
    const courseStats = {
      totalCourses: courseCount
    };

    res.status(200).json(courseStats);
  } catch (error) {
    console.error(`Error fetching course stats: ${error.message}`);
    res.status(500).json({ message: 'Error fetching course stats', error: error.message });
  }
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats,
  getAllCourses
};