import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
// import { userIsAuthenticated } from '../helpers/auth'



const Login = () => {

  //* History
  const history = useHistory()

  //* State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    message: ''
  })

  //* Functions 
  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      setTokenToLocalStorage(data.token)
      history.push('/')
    } catch (error) {
      console.log('error ->', error.response.data)
      if (error.response.data) setErrors(error.response.data)
    }
  }

  return (
    <>
      <div className="loginPage page">

        <div className="form-header">
          <h2>Login to your account.</h2>
          <h3>Don't have an account?
            <a href="/signup"> Get one here.</a>
          </h3>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>

            <div className="formfield">
              <label htmlFor="email" >Email</label>
              <input onInput={handleChange} type="email" id="email" name="email" value={formData.email} placeholder="Your email goes here" />
            </div>

            <div className="formfield">
              <label htmlFor="password" >Password</label>
              <input onInput={handleChange} type="password" id="password" name="password" value={formData.password} placeholder="Your password goes here" />
              {errors.message && <p className="error">You've entered an invalid email/password combination. Try again</p>}
            </div>
            <button className="form-button">LOGIN</button>
          </form>
        </div>
      </div>

    </>
  )
}

export default Login