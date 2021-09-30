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
      <div className='searchPage'>
        <p className='destinationSearch'> Search recipe:  <input type='text' placeholder='ex: Lasagna' id='search-field' onInput={handleSearch}></input></p>
        {recipes.length > 0 ?
          recipes.map(recipe => {

            return <Link to={`/SearchRecipe/${recipe._id}`}>
              <div key={recipe.name} className='recipeCard'>
                <p>{recipe.name}</p>
                <p>{recipe.difficulty}</p>
                <img className="img-thumbnail" src={recipe.image} alt={recipe.name} />
              </div>
            </Link>

          })
          :
          <>
            {error ?
              <h2 className='display-5 text-center'> Something went wrong!</h2>
              :
              <h2 className='display-5 text-center'> Loading...</h2>
            }
          </>
        }
      </div>


    </>
  )
}

export default SearchRecipe