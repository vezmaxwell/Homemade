import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage } from './auth'
import Stars from '../Stars'
import { Link } from 'react-router-dom'

const Profile = () => {

  const [profile, setProfile] = useState({})
  const [hasError, setHasError] = useState(false)


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
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {profile ?
        <div className="page">
          <div className="profileHeader">
            {profile.profileImage &&
              <img id="profileImage" src={profile.profileImage} alt="profile" />
            }
            <h1>Welcome, {profile.username}</h1>
            <p>Manage your created recipes here</p>
          </div>
          <div className="container">
            <div className="profileBody">
              <h2>My Recipes</h2>
              <div className="cards" >
                {profile.createdRecipes &&
                  profile.createdRecipes.map(recipe => {
                    return <div key={recipe._id} className='recipeCard'>
                      <Link to={`/SearchRecipe/${recipe._id}`}>
              <img className="searchIMG" src={recipe.image} alt="recipe" />
              </Link>
              <div className="cardDetails">
                <div className="title">
                  <h4>{recipe.name}</h4>
                </div>
                
                <Stars rating={recipe.averageRating} />
                
              </div>
              <div className="profileButton">
                        <Link to={`/searchrecipe/${recipe._id}/edit/`}><button >Edit Recipe</button></Link>
                        <button onClick={() => handleDeleteRecipe(recipe._id)} >Delete</button>
                      </div>
            </div>            
                  })

                }
              </div>
            </div>

          </div>
        </div>
        :
        <>
          {hasError ?
            <h2>Oops something went wrong.</h2>
            :
            <h2>Loading...</h2>
          }
        </>
      }
    </>
  )
}

export default Profile