// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : 
/*
            Séparer les routes dans différents fichiers permet de garder le code organisé, 
            modulaire et facile à maintenir. Cela permet de gérer des ensembles de routes 
            de manière logique, ce qui facilite l'évolutivité de l'application. Par exemple, 
            vous pourriez avoir des fichiers séparés pour différentes parties de l'application 
            (comme les utilisateurs, les cours ou les produits), ce qui permet de garder 
            chaque fichier concentré sur une fonctionnalité spécifique.
*/
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: 
/*
            Pour organiser les routes de manière cohérente, il est important de regrouper les 
            routes liées entre elles. Cela peut être fait en organisant les routes par ressources
            (comme les utilisateurs, les cours, etc.) ou par fonctionnalités (comme 
            l'authentification, les opérations CRUD, etc.). De plus, l'utilisation cohérente 
            des paramètres de route et des middlewares (is the access rules, if you are the admin you
            have the right to access some rout like user crud ect ect), ainsi que le respect des conventions 
            de nommage des routes, aide à maintenir la clarté et la cohérence dans le code.
*/ 

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.get('/stats', courseController.getCourseStats);

module.exports = router;