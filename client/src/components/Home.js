import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
// import { Link } from 'react-router-dom'


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
      <Carousel autoPlay infiniteLoop>
        {recipes.slice(0, 3).map(recipe => {
          return (
            <>
              <div className='carousel'>
                <div className="carouselInfo">
                  <h2 key={recipe._id}>{recipe.name}</h2>
                  <h3 >{recipe.time}</h3>
                </div>
                <div className="imageCarousel">
                  <img className="countryImg" src={recipe.image} alt={recipe.name} />
                </div>
              </div>
            </>
          )
        })
        }
      </Carousel>
    </>


  )

}

export default Home