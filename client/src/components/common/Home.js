import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Link } from 'react-router-dom'
import Stars from '../Stars'
import { userIsAuthenticated } from '../helpers/auth'

const Home = () => {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/recipes')
      console.log(data)
      setRecipes(data)
    }
    getData()
  }, [])

  // This triggers a re-render when the URL changes (like when the user logs out)
  useLocation()

  if (!recipes.length) {
    return <p>Loading</p>
  }


  return (
    <>
      <div className="container">
        <div className="homePage page">

          <Carousel showIndicators={false} showStatus={false} autoPlay infiniteLoop>
            {recipes.filter(recipe => Number(recipe.averageRating) >= 4).map(recipe => {
              return (
                <div key={recipe.name} className='carouselItem'>
                  <div className="carouselImage">
                    <img src={recipe.image} alt={recipe.name} />
                  </div>
                  <div className="carouselInfo">
                    <h2 className="carousel-name" key={recipe._id}>{recipe.name}</h2>
                    <h3 className="recipeTime">Average Rating:</h3>
                    <Stars rating={recipe.averageRating} />

                    <h3 className="recipeTime">Duration: {recipe.time} minutes</h3>
                    <Link className="viewRecipe" to={`SearchRecipe/${recipe._id}`}>See full recipe</Link>
                  </div>
                </div>
              )
            })
            }
          </Carousel>
          <div className="create-review">
            {
              userIsAuthenticated() ?
                <>
                  <Link to='/addRecipe'>
                    <div className="createHomePage">
                      <img className="create" src="https://pbs.twimg.com/profile_images/476011056582504449/8wW-GoJu.jpeg" alt="create recipe" />
                      <div className="createbox">
                        <p>Feeling inspired? Sign-up and create your own recipe, include the recipe's name, ingredients, time, cuisine, method, difficulty and upload an image for your own recipe and that's it! You have your own recipe and now you can share with your friends and family!</p>
                      </div>
                    </div>
                  </Link>
                </>
                :
                <>
                  <Link to='/SignUp'>
                    <div className="createHomePage">
                      <img className="create" src="https://pbs.twimg.com/profile_images/476011056582504449/8wW-GoJu.jpeg" alt="create recipe" />
                      <div className="createbox">
                        <p>Feeling inspired? Sign-up and create your own recipe, include the recipe's name, ingredients, time, cuisine, method, difficulty and upload an image for your own recipe and that's it! You have your own recipe and now you can share with your friends and family!</p>
                      </div>
                    </div>
                  </Link>
                </>
            }


            <div>
              <div className="createHomePage">
                <img className="create" src="https://thumb9.shutterstock.com/mosaic_250/2836333/723703846/stock-vector-audit-icon-vector-723703846.jpg" alt="review recipe" />
                <div className="createbox">
                  <p>You've made one of our recipes and now you would like to give feedback for the recipe? That is easy, just login, find the recipe and write your review! Easy as that!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Home