import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage, getPayload } from '../helpers/auth'

const SingleRecipe = () => {

  const [recipe, setRecipe] = useState(null)
  const [hasError, setHasError] = useState(false)

  const { id } = useParams()

  const history = useHistory()


  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/${id}`)
        setRecipe(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getRecipe()
  }, [id])

  const userIsOwner = (ownerId) => {
    const payload = getPayload()
    if (!payload) return
    return ownerId === payload.sub
  }

  const handleDeleteRecipe = async () => {
    try {
      await axios.delete(
        `/api/recipes/${id}`,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage}` },
        }
      )
      history.push('/searchrecipe')
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <div className="container">
        {recipe ?
          <>
            <div className='recipeNav'>
              <Link to="/searchrecipe">Back to recipes</Link>
              {
                userIsOwner(recipe.owner) &&
                <div>
                  <Link to={`/searchrecipe/${recipe._id}/edit/`}>Edit Recipe</Link>
                  <button onClick={handleDeleteRecipe}>Delete</button>
                </div>
              }
              <div>
                <div className='main'>
                  <div id='mainImage'>
                    <img src={recipe.image} alt={recipe.name} />
                  </div>
                  <div className="mainInfo">
                    <h1>{recipe.name}</h1>
                    <p>Difficulty: {recipe.difficulty}</p>
                    {/* Average Rating */}
                    <ul>
                      {recipe.ingredients.map(ingredient => {
                        return <li key={recipe._id}>{ingredient}</li>
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='method'>
              <h3>Method</h3>
              <ol>
                {recipe.method.map(method => {
                  return <>
                    <li key={recipe._id}>{method}</li>
                  </>
                })}
              </ol>
            </div>
            <hr />
            <div>
              <div className="review">
                <h3>Reviews</h3>
                <ul>
                  {recipe.reviews.map(review => {
                    return <li key={recipe._id}>
                      <p><strong>By {review.owner.username}</strong></p>
                      <img src={review.owner.image} alt="users avatar" />
                      <p>Rating: {review.rating}/5</p>
                      <p>{review.text}</p>
                      <img src={review.image} alt="users attempt" />
                    </li>
                  })}
                </ul>
              </div>
            </div>
          </>

          :
          <>
            {hasError ?
              <h2>Oops something went wrong.</h2>
              :
              <h2>Loading...</h2>
            }
          </>
        }
      </div>
    </>

  )

}

export default SingleRecipe