import mongoose from 'mongoose'
import 'dotenv/config'
import User from '../models/user.js'

// Models
import Recipe from '../models/recipe.js'

// Data
import recipeData from './data/recipes.js'
import userData from './data/users.js'


//* Seed database
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.dbURI)
    console.log('Database connected')

    await mongoose.connection.db.dropDatabase()
    console.log('Dropped database')

    const recipes = await Recipe.create(recipeData)
    console.log(`Database seeded with ${recipes.length} recipes`)



    //* Create users
    const users = await User.create(userData)
    console.log(`Database seeded with ${users.length} users`)

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