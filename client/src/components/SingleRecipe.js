import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleRecipe = () => {

  const [recipe, setRecipe] = useState(null)
  const [hasError, setHasError] = useState(false)

  const { id } = useParams()


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


  return (
    <>
      {recipe ?
        <>
          <div>
            <img src={recipe.image} alt={recipe.name} />
            <h1>{recipe.name}</h1>
            <p>{recipe.difficulty}</p>
            {/* Star * {recipe.averageRating} */}
            <ul>
              {recipe.ingredients.map(ingredient => {
                return <li key={recipe._id}>{ingredient}</li>
              })}
            </ul>
          </div>
          <hr />
          <div>
            <h3>Methods</h3>
            <ol>
              {recipe.method.map(method => {
                return <li key={recipe._id}>{method}</li>
              })}
            </ol>
            <hr />
            <h3>Reviews</h3>
            <ul>
              {recipe.reviews.map(review => {
                return <li key={recipe._id}>
                  <p>By {review.owner.name}</p>
                  <img src={review.image} alt="User personal" />
                  {/* Star * {review.owner.rating} */}
                  <p>{review.text}</p>
                </li>
              })}
            </ul>
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
    </>
  )

}

export default SingleRecipe