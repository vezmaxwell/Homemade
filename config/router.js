import express from 'express'
import { secureRoute } from './secureRoute.js'
import { loginUser, registerUser } from '../controllers/auth.js'
import { getAllRecipes, createRecipe, getSingleRecipe, editRecipe, deleteRecipe, addReview, deleteReview } from '../controllers/recipes.js'

const router = express.Router()

router.route('/recipes')
  .get(getAllRecipes)

router.route('/recipes')
  .post(createRecipe)

router.route('/recipes/:id')
  .get(getSingleRecipe)
  .put(editRecipe)
  .delete(deleteRecipe)

router.route('/recipes/:id/review')
  .post(secureRoute, addReview)

router.route('/recipes/:id/review/:reviewId')
  .delete(secureRoute, deleteReview)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)




export default router