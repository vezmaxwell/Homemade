import recipes from '../db/data/recipes.js'
import recipe from '../models/recipe.js'
import Recipe from '../models/recipe.js'


//* Get /recipes
export const getAllRecipes = async (_req, res) => {
  const recipes = await Recipe.find()
  console.log('Get Recipes ->', recipes)
  return res.status(200).json(recipes)
}

//* Post /recipe -> create new recipe
export const createRecipe = async (req, res) => {
  try {
    console.log(req.body)
    const recipeToAdd = await Recipe.create(req.body)
    res.status(201).json(recipeToAdd)
  } catch (error) {
    console.log('Recipe failed to add')
    console.log(error)
    return res.status(422).json(error)
  }
}


//* Get /recipe -> return single recipe
export const getSingleRecipe = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const recipe = await Recipe.findById(id)
    console.log(recipe)
    return res.status(200).json(recipe)
  } catch (error) {
    console.log('Error finding recipe')
    console.log(error)
    return res.status(404).json({ message: 'Recipe not found', errors: error })
  }
}

//* Put /recipe/:id -> edit recipe -> user only
export const editRecipe = async (req, res) => {
  const { id } = req.params
  try {
    const recipeToUpdate = await Recipe.findById(id)
    if (!recipeToUpdate) throw new Error()
    await recipeToUpdate.update(req.body)
    return res.status(202).json(recipeToUpdate)
  } catch (error) {
    console.log('Recipe not updated')
    console.log(error)
    return res.status(404).json(error)
  }
}

//* Delete /recipe/:id 
export const deleteRecipe = async (req, res) => {
  const { id } = req.params 
  try {
    const recipeToDelete = await Recipe.findById(id)
    if (!recipeToDelete) throw new Error('Recipe not found')
    await Recipe.findById(id)
    return res.sendStatus(204)
  } catch (error) {
    console.log('Recipe not found')
    console.log(error)
    return res.status(404).json(error)
  }
}

//* Post /recipe/:id/review -> add review to specific recipe -> user only
export const addReview = async (req, res) => {
  const { id } = req.params
  try {
    const recipe = await Recipe.findById(id)
    if (!recipe) throw new Error()
    const newReview = { ...req.body, owner: req.currentUser._id }
    recipe.reviews.push(newReview)
    await recipe.save()
    return res.status(200).json(recipe)
  } catch (error) {
    console.log(error)
    return res.status(404).json(error)
  }
}

//* Delete /recipe/:id/review -> delete review, maybe only admin
export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params
  try {
    const recipe = await Recipe.findById(id)
    if (!recipe) throw new Error()
    const reviewToDelete = recipe.reviews.id(reviewId)
    if (!reviewToDelete) throw new Error('Review not found')
    if (!reviewToDelete.owner.equals(req.currentUser._id) && (!recipe.owner.equals(req.currentUser._id))) throw new Error('Unauthorised')
    await reviewToDelete.remove()
    await recipe.save()
    return res.sendStatus(204).json(recipe)
  } catch (error) {
    console.log(error)
    return res.status(404).json(error)
  }
}
