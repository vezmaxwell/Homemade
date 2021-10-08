import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

//* User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String }
})

//* Virtual Field
userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation
  })


//* Virtual field of created recipes
userSchema.virtual('createdRecipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'owner'
})


//* Remove password
userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json){
    delete json.password
    return json
  }
})

//* Custom pre-validation
userSchema
  .pre('validate', function(next){
    if (this.isModified('password') && this.password !== this._passwordConfirmation){
      this.invalidate('passwordConfirmation', 'Passwords don\'t match')
    }
    next()
  })

//* Custom pre-save
userSchema
  .pre('save', function(next){
    if (this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

//* Save
userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}


userSchema.plugin(uniqueValidator)

//* Export 
export default mongoose.model('User', userSchema)
