import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Link } from 'react-router-dom'


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

  if (!recipes.length) {
    return <p>Loading</p>
  }
  return (
    <>
      <div className="homePage">
        <div className="container">
          <p className="monthRecipes">Recipes of the month:</p>
          <Carousel showIndicators={false} showStatus={false} autoPlay infiniteLoop>
            {recipes.slice(0, 3).map(recipe => {
              return (
                <>
                  <div className='carouselItem'>
                    <div className="carouselImage">
                      <img src={recipe.image} alt={recipe.name} />
                    </div>
                    <div className="carouselInfo">
                      <h2 key={recipe._id}>{recipe.name}</h2>
                      <h3 >Recipe time: {recipe.time}</h3>

                      <Link className="viewRecipe" to={`SearchRecipe/${recipe._id}`}>See full recipe</Link>
                    </div>

                  </div>
                </>
              )
            })
            }
          </Carousel>
        </div>
      </div>
    </>


  )

}

export default Home