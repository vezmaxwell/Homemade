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
    <div className="page singleRecipePage">
      <div className="container">
        {recipe ?
          <>
            <div className='recipeNav'>
              <div className="navButtons">
                <Link to="/searchrecipe"><button>Back to recipes</button></Link>

                {
                  userIsOwner(recipe.owner.id) && // Add recipe.owner.id instead
                  <div className="edit">
                    <Link to={`/searchrecipe/${recipe._id}/edit/`}><button>Edit Recipe</button></Link>
                    <button onClick={handleDeleteRecipe}>Delete</button>
                  </div>
                }
              </div>
              <div>
                <div className='main'>
                  <h1 className="recipe-name">{recipe.name}</h1>


                  <div className="imageInfo">
                    <div className='mainImage'>
                      <img className="mainImg" src={recipe.image} alt={recipe.name} />
                    </div>

                    <div className="mainInfo">

                      <Stars rating={recipe.averageRating} />



                      <h3 className="singleh3">Ingredients</h3>
                      <p>Difficulty: {recipe.difficulty}</p>
                      <p className="serves">Serves {recipe.serves} people</p>


                      <ul>
                        {recipe.ingredients.map((ingredient, n) => {
                          return <li key={n} className="ingredients">{ingredient}</li>
                        })}
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="owner-profile">
              <div>
                {recipe.owner.profileImage &&
                  <img className="profileImg" src={recipe.owner.profileImage} alt="profile" />
                }
              </div>
              <div className="owner-recipe">
                <Link to={`/user/${recipe.owner._id}`}>
                  <p className="username">{recipe.owner.username}'s recipe</p>
                </Link>
              </div>
            </div>
            <hr />
            <div className='method'>
              <h3 className="singleh3">Method</h3>
              <ol>
                {recipe.method.map((method, n) => {
                  return <>
                    <li key={n}>{method}</li>
                  </>
                })}
              </ol>
            </div>
            <hr />

            <div className="review">
              <h3 className="singleh3">Reviews</h3>
              {userIsAuthenticated() ?
                <Link className="navLink" to={`/searchrecipe/${recipe._id}/review/`}><button>Add Review</button></Link>
                :
                <Link className="navLink" to={`/login`}><button>Add Review</button></Link>
              }
              <ul>
                {recipe.reviews.map((review, n) => {
                  return <li key={n}>
                    <Link to={`/user/${review.owner._id}`}>
                    <div className="reviewHeader">
                      {review.owner.profileImage &&
                        <img src={review.owner.profileImage} className="profileImage" alt="profilePhoto" />
                      }
                      <p><strong>By {review.owner.username}</strong></p>
                    </div>
                    <Stars rating={review.rating} />
                    <p>{review.text}</p>
                    {review.image &&
                      <img src={review.image} className='reviewImage' alt="users attempt" />
                    }
                    </Link>
                  </li>
                })}
              </ul>
            </div>
            <div className="related">
              <h3 className="singleh3">Related Recipes</h3>
              <div className="cards" >
                {recipes.filter(rec => rec.cuisine.toLowerCase() === `${recipe.cuisine}` && rec.name !== `${recipe.name}`).map((rec, n) => {
                  return <Link key={n} className='recipeCard' to={`/SearchRecipe/${rec._id}`}>
                    <img className="searchIMG" src={rec.image} alt="recipe" />
                    <div className="cardDetails">
                      <div className="title">
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