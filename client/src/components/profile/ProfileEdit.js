import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import ImageUpload from '../helpers/ImageUpload'
import { getTokenFromLocalStorage } from '../helpers/auth'


const ProfileEdit = () => {

  //* History
  const history = useHistory()

  //* State
  const [formData, setFormData] = useState({
    // email: '',
    // username: '',
    // password: '',
    // passwordConfirmation: '',
    // profileImage: ''
  })

  const [errors, setErrors] = useState({
    email: {},
    username: {},
    password: {},
    passwordConfirmation: {}
  })

  //* Functions 
  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(
        '/api/profile/edit', 
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
      history.push('/profile')
    } catch (error) {
      console.log('error ->', error.response)
      if (error.response.data.errors) setErrors(error.response.data.errors)
    }
  }


  const handleImageUrl = (url) => {
    try {
      setFormData({ ...formData, profileImage: url })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
    <Link to="/profile"><button>Back</button></Link>
    <div className="signUpPage page">

      <div className="form-header sign-up-form-header">
        <h2>Customise profile</h2>
      </div>

      <div className="form-container sign-up-form-container">

        <form onSubmit={handleSubmit}>

          <div className="formfield">
            <label htmlFor="userName" >Change Username</label>
            <input onInput={handleChange} type="text" id="userName" name="username" value={formData.username} placeholder="Your username goes here" />
            {errors.username && <p className="error">Please enter a username</p>}
          </div>

          <div className="formfield">
            <ImageUpload name="profileImage" handleImageUrl={handleImageUrl} />
          </div>

          <button className="form-button">Confirm</button>

        </form>
      </div>

    </div>
    </>
  )
}

export default ProfileEdit
