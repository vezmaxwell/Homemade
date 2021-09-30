import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SearchRecipe = () => {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/recipes')
      console.log(data)
      setRecipes(data)
    }
    getData()
  }, [])

  return (
    <>
      <div className='searchPage'>
        <h2>Search Recipe</h2>
        {recipes.map(recipe => {
        return <Link to={`/SearchRecipe/${recipe._id}`}>
        <div key={recipe.name} className='recipeCard'>
        <p>{recipe.name}</p>
        <p>{recipe.difficulty}</p>
        </div>
        </Link>
      })}
      </div>
      
    </>
  )
}

export default SearchRecipe