import express from 'express'
import { getAllRecipes, createRecipe, getSingleRecipe, editRecipe, deleteRecipe } from '../controllers/recipes.js'

const router = express.Router()

router.route('/recipes')
  .get(getAllRecipes)

router.route('/recipes')
  .post(createRecipe)

router.route('/recipes/:id')
  .get(getSingleRecipe)
  .put(editRecipe)
  .delete(deleteRecipe)

export default router