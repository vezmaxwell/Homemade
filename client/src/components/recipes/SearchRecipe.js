import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Stars from '../Stars'

const itemsPerPage = 12

const SearchRecipe = () => {

  const [recipes, setRecipes] = useState([])
  const [diet, setDiet] = useState('all')
  const [rating, setRating] = useState('all')
  const [search, setSearch] = useState('')
  const [error, setError] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await axios.get('/api/recipes')
        setRecipes(data)


      } catch (error) {
        setError(true)
      }
    }
    getData()
  }, [search])

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase())
    setPageNumber(1)
  }

  const handleDiet = (event) => {
    setDiet(event.target.value)
    setPageNumber(1)
  }
  const handleRating = (event) => {
    setRating(event.target.value)
    setPageNumber(1)
  }

  const filteredItems = recipes.filter(recipe => recipe.name.toLowerCase().includes(search)).filter(recipe => {
    if (diet === 'all') return true
    if (diet === 'vegetarian' && recipe.vegetarian) return true
    if (diet === 'vegan' && recipe.vegan) return true
    return false
  }).filter(recipe => {
    if (rating === 'all') return true
    if (rating === 'one' && Number(recipe.averageRating) >= 1) return true
    if (rating === 'two' && Number(recipe.averageRating) >= 2) return true
    if (rating === 'three' && Number(recipe.averageRating) >= 3) return true
    if (rating === 'four' && Number(recipe.averageRating) >= 4) return true
    if (rating === 'five' && Number(recipe.averageRating) >= 5) return true
    return false
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)


  if (error) {
    return <span>Something went wrong...</span>
  }
  return (
    <>


      <div className='searchPage'>
        <div className="searchBackground">
          <input type='text' className='recipeSearch' placeholder='🔎 Search recipes' id='search-field' onInput={handleSearch}></input>
        </div>

        <div className="container">

          <div className="selectFilter">
            <div className="selectFilterDiet">
              <div>Diet:</div>
              <option value="all" default></option>
              <select className="searchSelect" for="recipes" id="recipes" onChange={handleDiet}>
                {/* <option value="all" default>All 🍕</option> */}
                <option value="all" default></option>
                <option value="vegetarian">Vegetarian 🧀</option>
                <option value="vegan">Vegan 🌱</option>
              </select>
            </div>
            <div className="selectFilterRating">
              <div>Average Rating:</div>
              <option value="all" default></option>
              <select className="searchSelect" for="recipes" id="recipes" onChange={handleRating}>
                {/* <option value="all" default> All ⭐️ </option> */}
                <option value="all" default></option>
                <option value="one">⭐️ or above</option>
                <option value="two">⭐️⭐️ or above</option>
                <option value="three">⭐️⭐️⭐️ or above</option>
                <option value="four">⭐️⭐️⭐️⭐️ or above</option>
                <option value="five">⭐️⭐️⭐️⭐️⭐️ </option>
              </select>
            </div>
          </div>



          <div className="cards" >
            {filteredItems.slice(0, pageNumber * itemsPerPage).map((recipe, i) => {
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
          <div className="loadBackground">
            {
              pageNumber < totalPages && <button className="pageNumber" onClick={() => setPageNumber(pageNumber + 1)}>Load more...</button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchRecipe