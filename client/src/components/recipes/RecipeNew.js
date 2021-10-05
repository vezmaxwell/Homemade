import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import ImageUpload from '../helpers/ImageUpload'

const RecipeNew = () => {

  const history = useHistory()

  const [ formData, setFormData ] = useState({
    name: '',
    summary: '',
    ingredients: [],
    time: '',
    image: '',
    cuisine: '',
    method: [],
    difficulty: '',
    vegan: false,
    vegetarian: false
  })

  const [ errors, setErrors ] = useState({
    name: { message: '' },
    time: { message: '' },
    image: { message: '' },
    cuisine: { message: '' },
    difficulty: { message: '' }
  })



  const handleChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    setFormData({ ...formData, [event.target.name]: value })
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const handleMultiEnter = event => {
    const value = event.target.value.split(',')
    setFormData({ ...formData, [event.target.name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(
        '/api/recipes',
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push('/searchrecipe')
    } catch (error) {
      if (error.response.data.errors) setErrors(error.response.data.errors)
    }
  }

  const handleImageUrl = (url) => {
    try {
      setFormData({ ...formData, image: url })
    } catch (error) {
      if (error.response.data.errors) setErrors(error.response.data.errors)
    }
    
  }

  return (
<div className="signUpPage">

<div className="form-header sign-up-form-header">
  <h2>New Recipe</h2> 
  
  </div>

  <div className="form-container sign-up-form-container">

  <form onSubmit={handleSubmit}>

    <div className="formfield">
      <p>Recipe Name</p>
      <input onInput={handleChange} name="name" type="text" placeholder="Recipe Name" value={formData.name}/>
      {errors.name && <p className="error">Please enter the recipe name</p>}
    </div>

    <div className="formfield">
      <p>Summary</p>
      <textarea onInput={handleChange} name="summary" type="text" placeholder="Please enter a summary if you wish" maxLength="500" value={formData.summary}/>
    </div>
  
    <div className="formfield">
      <p>Ingredients</p>
      <textarea onInput={handleMultiEnter} name="ingredients" type="text" placeholder="Ingredients ex: 1 pepper, 2 cloves of garlic, 3 oranges,..." value={formData.ingredients}/>
    </div>

    <div className="formfield">
      <p>Time(mins)</p>
      <input onInput={handleChange} name="time" type="number" value={formData.time}/>
      {errors.time && <p className="error">Please enter time</p>}
    </div>

    <div className="formfield">
      <p>Cuisine</p>
      <select onInput={handleChange} name="cuisine" type="text" value={formData.cuisine}>
      <option value="" disabled></option>
        <option value="american">American</option>
        <option value="chinese">Chinese</option>
        <option value="continental">Continental</option>
        <option value="cuban">Cuban</option>
        <option value="french">French</option>
        <option value="greek">Greek</option>
        <option value="indian">Indian</option>
        <option value="indonesian">Indonesian</option>
        <option value="italian">Italian</option>
        <option value="japanese">Japanese</option>
        <option value="korean">Korean</option>
        <option value="lebanese">Lebanese</option>
        <option value="malaysian">Malaysian</option>
        <option value="mexican">Mexican</option>
        <option value="pakistani">Pakistani</option>
        <option value="russian">Russian</option>
        <option value="singapore">Singapore</option>
        <option value="spanish">Spanish</option>
        <option value="thai">Thai</option>
        <option value="tibetan">Tibetan</option>
        <option value="vietnamese">Vietnamese</option>
        <option value="other">Other</option>
      </select>
      {errors.cuisine && <p className="error">Please select cuisine</p>}
    </div>

    <div className="formfield">
      <p>Method</p>
      <textarea onInput={handleMultiEnter} name="method" type="text" placeholder="Method example: Into a heated pan spray with the 1 squirt of the oil spray or add a tsp of oil add the onion garlic and ginger cook over a gentle heat for 3 mins, Add the spices red chilli and bay leaf along with a spoonful of water and cook for a few more mins stirring until the aromas are released" value={formData.method}/>
    </div>

    <div className="formfield">
      <p>Difficulty</p>
      <select onInput={handleChange} name="difficulty" type="text" value={formData.difficulty}>
        <option value="" disabled></option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      {errors.difficulty && <p className="error">Please select difficulty</p>}
    </div>
    
    <div className="formfield">
      <p>Vegetarian</p>
      <input onInput={handleChange} name="vegetarian" type="checkbox" value={formData.vegetarian}/>
    </div>

    <div className="formfield">
      <p>Vegan</p>
      <input onInput={handleChange} name="vegan" type="checkbox" value={formData.vegan}/>
    </div>

    <div className="formfield">
    <ImageUpload value={formData.image} name="image" handleImageUrl={handleImageUrl}/>
    {errors.image && <p className="error">Please try uploading image again</p>}
    </div>

    <button className="form-button">Create Recipe</button>

  </form>    
  </div>

</div>
  )
}

export default RecipeNew