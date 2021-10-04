import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import ImageUpload from '../helpers/ImageUpload'

const ReviewNew = () => {

  const { id } = useParams()
  const history = useHistory()

  const [ formData, setFormData ] = useState({
    text: '',
    rating: 1,
    image: '',
  })

  const [ errors, setErrors ] = useState({
    text: { message: '' }
  })



  const handleChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    setFormData({ ...formData, [event.target.name]: value })
    setErrors({ ...errors, [event.target.name]: '' })
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(
        `/api/recipes/${id}/review`,
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
  <h2>Add review</h2> 
  
  </div>

  <div className="form-container sign-up-form-container">

  <form onSubmit={handleSubmit}>

    <div className="formfield">
      <p>Review</p>
      <textarea onInput={handleChange} name="text" type="text" placeholder="enter review here"  maxLength='400' value={formData.text}/>
      {errors.text && <p className="error">{errors.text.message}</p>}
    </div>

    <div className="formfield">
      <p>Rating</p>
      <input onInput={handleChange} name="rating" type="number" min='1' max='5'value={formData.rating}/>
    </div>

    <div className="formfield">
    <ImageUpload value={formData.image} name="image" handleImageUrl={handleImageUrl}/>
    </div>

    <button className="form-button">Submit</button>

  </form>    
  </div>

</div>
  )
}

export default ReviewNew