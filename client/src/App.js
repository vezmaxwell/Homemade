import axios from 'axios'
import React, { useState, useEffect } from 'react'


//* Componenets
import Navbar from './components/common/Navbar'

function App() {

  const [ recipes, setRecipes ] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/recipes')
      setRecipes(data)
    }
    getData()
  }, [])

  return (
    <>
    <Navbar />


      {recipes.map(recipe => {
        return <h3 key ={recipe._id}>{recipe.name}</h3>
      })}
    </>
  )
}

export default App



// <BrowserRouter>
// <Navbar />
//   <Switch>
//     <Root>
//     <Home />
//     </Root>
//   </Switch>
// </BrowserRouter>