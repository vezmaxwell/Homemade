import User from '../models/user.js'

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate('createdRecipes')
    if (!user) throw new Error('User not found')
    return res.status(200).json(user)
  } catch (error) {
    console.log('Could not get user profile')
    console.log(error.message)
    return res.status(404).json({ message: error.message })
  }
}