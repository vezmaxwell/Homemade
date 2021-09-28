import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  text: { type: String, maxlength: 400 },
  rating: { type: Number, min: 1, max: 5, required: true },
  image: { type: String }
}, {
  timestamps: true
})

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  vegan: { type: Boolean, required: true },
  vegetarian: { type: Boolean, required: true },
  ingredients: [{ type: String, required: true }],
  time: { type: String },
  image: { type: String, required: true },
  cuisine: { type: String },
  method: [{ type: String, required: true }],
  difficulty: { type: String },
  reviews: [reviewSchema]
})


export default mongoose.model('Recipe', recipeSchema)