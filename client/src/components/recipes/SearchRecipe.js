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
          {recipes.length > 0 ?
            recipes.map(recipe => {

              return <div className="serachedCards">

                <Link to={`/SearchRecipe/${recipe._id}`}>
                  <div key={recipe.name} className='recipeCard'>
                    <p>{recipe.name}</p>
                    <p>{recipe.difficulty}</p>
                    <img className="searchIMG" src={recipe.image} alt="recipe" />
                  </div>
                </Link>
              </div>

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

      </div>
    </>
  )
}

export default SearchRecipe