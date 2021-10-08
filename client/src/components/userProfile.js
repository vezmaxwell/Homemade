import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Stars from './Stars'
import { Link, useParams } from 'react-router-dom'

const UserProfile = () => {
  const { id } = useParams()

  const [profile, setProfile] = useState({})
  const [hasError, setHasError] = useState(false)


  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          `/api/user/${id}/`,

        )
        setProfile(data)
        console.log(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getProfile()
  }, [id])


  return (
    <>
      {profile ?
        <div className="page">
          <div className="profileHeader">
            {profile.profileImage &&
              <img id="profileImage" src={profile.profileImage} alt="profile" />
            }
            <h1>{profile.username}</h1>
          </div>

          <div className="container">
            <div className="profileBody">
              <h2>{profile.username}'s Recipes</h2>
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

export default UserProfile