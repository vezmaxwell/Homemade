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
  name: { type: String, required: false, unique: true },
  summary: { type: String, maxlengt: 500 },
  vegan: { type: Boolean, required: true },
  vegetarian: { type: Boolean, required: true },
  ingredients: [{ type: String, required: true }],
  time: { type: Number, required: true },
  image: { type: String, required: true },
  cuisine: { type: String, required: true },
  method: [{ type: String, required: true }],
  difficulty: { type: String, required: true },
  serves: { type: Number },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  reviews: [reviewSchema]
})

recipeSchema.virtual('averageRating')
  .get(function () {
    if (!this.reviews.length) return 'Not yet rated'
    const sum = this.reviews.reduce((acc, review) => {
      return acc + review.rating
    }, 0)
    return Number(sum / this.reviews.length).toFixed(2)
  })

recipeSchema.set('toJSON', { virtuals: true })


export default mongoose.model('Recipe', recipeSchema)
