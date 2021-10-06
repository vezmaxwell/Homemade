import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage, getPayload, userIsAuthenticated } from '../helpers/auth'
import Stars from '../Stars'

const SingleRecipe = () => {

  const [recipe, setRecipe] = useState(null)
  const [hasError, setHasError] = useState(false)

  const [recipes, setRecipes] = useState([])

  const { id } = useParams()

  const history = useHistory()

  useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await axios.get('/api/recipes')
        setRecipes(data)

      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])


  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/${id}`)
        setRecipe(data)
        console.log(data)
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
        `/api/recipes/${id}`, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push('/searchrecipe')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="page">
      <div className="container">
        {recipe ?
          <>
            <div className='recipeNav'>
              <Link to="/searchrecipe">Back to recipes</Link>
              
              { 
                userIsOwner(recipe.owner.id) && // Add recipe.owner.id instead
                <div>
                  <Link to={`/searchrecipe/${recipe._id}/edit/`}>Edit Recipe</Link>
                  <button onClick={handleDeleteRecipe}>Delete</button>
                </div>
              }
              <div>
                <div className='main'>
                  <h1 className="recipe-name">{recipe.name}</h1>


                <div className="imageInfo">
                  <div class='mainImage'>
                    <img src={recipe.image} alt={recipe.name} />
                  </div>

                  <div className="mainInfo">

                    <Stars rating={recipe.averageRating} />
                    
                    

                    <h3 className="singleh3">Ingredients</h3>
                    <p>Difficulty: {recipe.difficulty}</p>


                    <ul>
                      {recipe.ingredients.map(ingredient => {
                        return <li className="ingredients" key={recipe._id}>{ingredient}</li>
                      })}
                    </ul>
                    </div>

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
            <div className="review">
              <h3 className="singleh3">Reviews</h3>
              {userIsAuthenticated() &&
                <Link className="navLink" to={`/searchrecipe/${recipe._id}/review/`}><button>Add Review</button></Link>
              }
              <ul>
                {recipe.reviews.map(review => {
                  return <li key={review._id}>
                    <p><strong>By {review.owner.username}</strong></p>
                    {review.owner.image &&
                      <img src={review.owner.image} alt="profilePhoto" />
                    }
                    <Stars rating={review.rating} />
                    <p>{review.text}</p>
                    {review.image &&
                      <img src={review.image} className='reviewImage' alt="users attempt" />
                    }
                  </li>
                })}
              </ul>
            </div>
            <div className="related">
              <h3 className="singleh3">Related Recipes</h3>
              <div className="cards" >
                {recipes.filter(rec => rec.cuisine.toLowerCase() === `${recipe.cuisine}` && rec.name !== `${recipe.name}`).map(rec => {
                  return <Link key={rec._id} className='recipeCard' to={`/SearchRecipe/${rec._id}`}>
                    <img className="searchIMG" src={rec.image} alt="recipe" />
                    <div className="cardDetails">
                      <div className="tittle">
                        <h4>{rec.name}</h4>
                      </div>
                      <Stars rating={rec.averageRating} />
                    </div>
                  </Link>
                })}
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
    </div>

  )

}

export default SingleRecipe