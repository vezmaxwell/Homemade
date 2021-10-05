import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

  //* History
  const history = useHistory()

  //* State
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: ''
  })

  //* Functions 
  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/register', formData)
      setTokenToLocalStorage(data.token)
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="signUpPage">

      <div className="form-header sign-up-form-header">
        <h2>Sign up for an account.</h2>

        <h3>Already have an account?
          <a href="/login"> Login here.</a>
        </h3>

      </div>

      <div className="form-container sign-up-form-container">

        <form onSubmit={handleSubmit}>

          <div className="formfield">
            <p>Email</p>
            <input onInput={handleChange} type="email" name="email" value={formData.email} placeholder="Your email goes here" />
          </div>

          <div className="formfield">
            <p>Username</p>
            <input onInput={handleChange} type="text" name="username" value={formData.username} placeholder="Your username goes here" />
          </div>

          <div className="formfield">
            <p>Password</p>
            <input onInput={handleChange} type="text" name="password" value={formData.password} placeholder="Your email goes here" />
          </div>

          <div className="formfield">
            <p>Password Confirmation</p>
            <input onInput={handleChange} type="text" name="passwordConfirmation" value={formData.passwordConfirmation} placeholder="Confirm your password" />
          </div>

          <button className="form-button">SIGN UP</button>

        </form>
      </div>

    </div>
  )
}

export default SignUp