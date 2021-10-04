import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import ImageUpload from '../helpers/ImageUpload'

const RecipeEdit = () => {

  const { id } = useParams()
  const history = useHistory()

  const [ formData, setFormData ] = useState({
    // name: '',
    // summary: '',
    // ingredients: [],
    // time: '',
    // image: '',
    // cuisine: '',
    // method: [],
    // difficulty: '',
    // vegan: false,
    // vegetarian: false
  })

  const [ errors, setErrors ] = useState({
    name: {},
    time: {},
    image: {},
    cuisine: {},
    difficulty: {}
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
      await axios.put(
        `/api/recipes/${id}`,
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
  <h2>Edit Recipe</h2> 
  
  </div>

  <div className="form-container sign-up-form-container">

  <form onSubmit={handleSubmit}>

    <div className="formfield">
      <p>Recipe Name</p>
      <input onInput={handleChange} name="name" type="text" placeholder="Recipe Name" />
      {errors.name.message && <p className="error">{errors.name.message}</p>}
    </div>

    <div className="formfield">
      <p>Summary</p>
      <textarea onInput={handleChange} name="summary" type="text" placeholder="Summary" maxLength="500" />
    </div>
  
    <div className="formfield">
      <p>Ingredients</p>
      <textarea onInput={handleMultiEnter} name="ingredients" type="text" placeholder="Ingredients ex: 1 pepper, 2 cloves of garlic,..." />
    </div>

    <div className="formfield">
      <p>Time</p>
      <input onInput={handleChange} name="time" type="number" placeholder="Time in mins" />
      {errors.time.message && <p className="error">{errors.time.message}</p>}
    </div>

    <div className="formfield">
      <p>Cuisine</p>
      <select onInput={handleChange} name="cuisine" type="text" >
      <option value="" ></option>
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
      {errors.cuisine.message && <p className="error">{errors.cuisine.message}</p>}
    </div>

    <div className="formfield">
      <p>Method</p>
      <textarea onInput={handleMultiEnter} name="method" type="text" placeholder="Method ex: 1 pepper, 2 cloves of garlic,..." />
    </div>

    <div className="formfield">
      <p>Difficulty</p>
      <select onInput={handleChange} name="difficulty" type="text" >
        <option value=""></option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      {errors.difficulty.message && <p className="error">{errors.difficulty.message}</p>}
    </div>
    
    <div className="formfield">
      <p>Vegetarian</p>
      <input onInput={handleChange} name="vegetarian" type="checkbox" />
    </div>

    <div className="formfield">
      <p>Vegan</p>
      <input onInput={handleChange} name="vegan" type="checkbox" />
    </div>

    <div className="formfield">
    <ImageUpload name="image" handleImageUrl={handleImageUrl}/>
    {errors.image.message && <p className="error">{errors.image.message}</p>}
    </div>

    <button className="form-button">Submit changes</button>

  </form>    
  </div>

</div>
  )
}

export default RecipeEdit