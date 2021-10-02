import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Stars from '../Stars'

const SearchRecipe = () => {

  const [recipes, setRecipes] = useState([])
  const [diet, setDiet] = useState('all')
  const [rating, setRating] = useState('all')
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

  const handleDiet = (event) => {
    setDiet(event.target.value)
  }
  const handleRating = (event) => {
    setRating(event.target.value)
  }



  return (
    <>
      <div className="container">
        <div className='searchPage'>
          <div className="searchBackground">
            <input type='text' className='recipeSearch' placeholder='Seach recipes 🔎' id='search-field' onInput={handleSearch}></input>
            <div className="selectFilter">
              <div className="selectFilterDiet">
                <div>Diet:</div>
                <select for="recipes" id="recipes" onChange={handleDiet}>
                  <option value="all" default>All 🍕</option>
                  <option value="vegetarian">Vegetarian 🧀</option>
                  <option value="vegan">Vegan 🌱</option>
                </select>
              </div>
              <div className="selectFilterRating">
                <div>Average Rating:</div>
                <select for="recipes" id="recipes" onChange={handleRating}>
                  <option value="all" default> All ⭐️ </option>
                  <option value="one">⭐️ or above</option>
                  <option value="two">⭐️⭐️ or above</option>
                  <option value="three">⭐️⭐️⭐️ or above</option>
                  <option value="four">⭐️⭐️⭐️⭐️ or above</option>
                  <option value="five">⭐️⭐️⭐️⭐️⭐️ </option>
                </select>
              </div>
            </div>
          </div>
          <div className="cards" >
            {recipes.filter(recipe => recipe.name.toLowerCase().includes(search)).filter(recipe => {
              if (diet === 'all') return true
              if (diet === 'vegetarian' && recipe.vegetarian) return true
              if (diet === 'vegan' && recipe.vegan) return true
            }).filter(recipe => {
              if (rating === 'all') return true
              if (rating === 'one' && Number(recipe.averageRating) >= 1) return true
              if (rating === 'two' && Number(recipe.averageRating) >= 2) return true
              if (rating === 'three' && Number(recipe.averageRating) >= 3) return true
              if (rating === 'four' && Number(recipe.averageRating) >= 4) return true
              if (rating === 'five' && Number(recipe.averageRating) >= 5) return true
              console.log(recipe.rating)
            }).map((recipe, i) => {
              return <Link key={recipe._id} className='recipeCard' to={`/SearchRecipe/${recipe._id}`}>
                <img className="searchIMG" src={recipe.image} alt="recipe" />
                <div className="cardDetails">
                  <div className="tittle">
                    <h4>{recipe.name}</h4>
                  </div>
                  <Stars rating={recipe.averageRating} />
                  <p>Duration: {recipe.time} minutes</p>
                  {recipe.owner && <p>Created by: {recipe.owner.username}</p>}
                </div>
              </Link>
            }

            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchRecipe