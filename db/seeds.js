import mongoose from 'mongoose'
import 'dotenv/config'

// Models
import Recipe from '../models/recipe.js'

// Data
import recipeData from './data/recipes.js'

//* Seed database
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.dbURI)
    console.log('Database connected')

    await mongoose.connection.db.dropDatabase()
    console.log('Dropped database')

    const recipes = await Recipe.create(recipeData)
    console.log(`Database seeded with ${recipes.length} recipes`)

    await mongoose.connection.close()
    console.log('Bye')

  } catch (error) {
    console.log('Something went wrong')
    console.log(error)
    await mongoose.connection.close()
    console.log('Bye')
  }
}

seedDatabase()