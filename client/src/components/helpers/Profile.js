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

  return (
    <>
    <p>{profile.username}</p>
    <h2>Recipes created</h2>
    <div className="cards" >
      { profile.createdRecipes &&
      profile.createdRecipes.map(recipe => {
      return <Link key={recipe._id} className='recipeCard' to={`/SearchRecipe/${recipe._id}`}>
      <img className="searchIMG" src={recipe.image} alt="recipe" />
      <div className="cardDetails">
        <div className="tittle">
          <h4>{recipe.name}</h4>
        </div>
        <Stars rating={recipe.averageRating} />
      </div>
    </Link>
    })}
    </div>
    <div className="review">
    <h2>Reviews Left</h2>
    <img src={profile.profileImage} alt="profile" />
    { profile.reviews && 
    profile.review.map(review => {
      return <li key={review._id}> 
        <p><strong>By {review.owner.username}</strong></p>
        { review.owner.image &&
          <img src={review.owner.image} alt="profilePhoto" />
          }
          <Stars rating={review.rating} />
          <p>{review.text}</p>
          { review.image &&
          <img src={review.image} alt="users attempt" />
          }
  </li>
    })
    }
    </div>

    </>
  )
}

export default Profile