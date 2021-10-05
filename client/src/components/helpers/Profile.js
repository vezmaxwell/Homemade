import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage } from './auth'
import Stars from '../Stars'
import { Link, useHistory } from 'react-router-dom'

const Profile = () => {

  const [profile, setProfile] = useState({})
  const [hasError, setHasError] = useState(false)

  const history = useHistory()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          `/api/profile/`,
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setProfile(data)
        console.log(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getProfile()
  }, [])

  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(
        `/api/recipes/${id}`, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push('/profile')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <> <div className="profileHeader">
      {profile.profileImage &&
        <img id="profileImage" src={profile.profileImage} alt="profile" />
      }
      <h1>Welcome, {profile.username}</h1>
      <p>Manage your created recipes here</p>
    </div>
      <div className="container">
        <div className="profileBody">
          <h2>Recipes created</h2>
          <div className="cards" >
            {profile.createdRecipes &&
              profile.createdRecipes.map(recipe => {
                return <Link key={recipe._id} className='recipeCard' to={`/SearchRecipe/${recipe._id}`}>
                  <img className="searchIMG" src={recipe.image} alt="recipe" />
                  <div className="cardDetails">
                    <div className="tittle">
                      <h4>{recipe.name}</h4>
                    </div>
                    <Stars rating={recipe.averageRating} />
                  </div>
                  <div className="profileButton">
                    <Link to={`/searchrecipe/${recipe._id}/edit/`}><button>Edit Recipe</button></Link>
                    <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
                  </div>
                </Link>
              })
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile