import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import RecipeForm from './RecipeForm'

const RecipeNew = () => {

  const history = useHistory()

  const [ formData, setFormData ] = useState({
    name: '',
    summary: '',
    ingredients: [],
    time: 0,
    image: '',
    cuisine: '',
    method: [],
    vegan: false,
    vegetarian: false,
  })

  const [ errors, setErrors ] = useState({
    name: '',
    summary: '',
    ingredients: [],
    time: 0,
    image: '',
    cuisine: '',
    method: [],
    vegan: false,
    vegetarian: false,
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
        '/api/recipes',
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push('/searchrecipe')
    } catch (error) {
      if (error.response.data.errors) setErrors(error.response.data.errors)
      console.log(error.response.data)
    }
  }

  return (
    <RecipeForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errors={errors}
      formData={formData}
      title="New Recipe"
      btnText="Create Recipe"
      />
  )
}

export default RecipeNew