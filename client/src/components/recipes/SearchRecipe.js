import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const SearchRecipe = () => {

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState(false)
  const [includedInfo, setIncludedInfo] = useState([])

  console.log(includedInfo)
  console.log(error)

  useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await axios.get('/api/recipes')
        setRecipes(data)
        setIncludedInfo(data.included)

      } catch (error) {
        setError(true)
      }
    }
    getData()
  }, [search])

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase())

  }

  return (
    <>
      <div className="container">
        <div className='searchPage'>
          <div className="searchBackground">
            <p> Search recipe:  <input type='text' className='recipeSearch' placeholder='ex: Lasagna' id='search-field' onInput={handleSearch}></input></p>
          </div>
          <div className="cards" >
            {recipes.filter(recipe => recipe.name.toLowerCase().includes(search)).map((recipe, i) =>
              <Link key={recipe.name} className='recipeCard' to={`/SearchRecipe/${recipe._id}`}>
                <img className="searchIMG" src={recipe.image} alt="recipe" />
                <div className="cardDetails">
                  <div className="tittle">
                    <h4>{recipe.name}</h4>
                  </div>
                  <p className="avr">{recipe.averageRating}</p>
                  {recipe.owner && <p>Created by: {recipe.owner.username}</p>}

                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchRecipe