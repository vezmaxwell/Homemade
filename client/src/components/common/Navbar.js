import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import logo from '../../images/fork.png'
import homemade from '../../images/homemade.png'
import { userIsAuthenticated } from '../helpers/auth'

const Navbar = () => {

  //* History
  const history = useHistory()

  //* Location
  const location = useLocation()

  useEffect(() => {
// Triggers rerender with path change
  }, [location.pathname])



  //* We can put this in and the below handleLogout function, and make it so you can only see 'Add Recipe' or 'Logout' if the user is logged in

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  return (

    <div className="navBar">
      <div className="container">
        <Link className="navLink" to='/'>

{/* Logo Img */}

          <div className="logo-container">
            <img src={logo} alt="" className="logo" />
          </div>
        </Link>

{/* Logo Name */}

        <div className="homemade-container">
          <Link className="navLink" to='/'>
            <img src={homemade} alt="" className="homemade-logo" />
          </Link>
        </div>

{/* Navigation Links */}

        <div className="links">

          <ul>

        { 
          userIsAuthenticated() ?
            <>
              <li className="navLink" onClick={handleLogout}>Logout</li>
              <li><Link className="navLink" to='/'>Add Recipe</Link></li>
              <li><Link className="navLink" to='/'>All Recipes</Link></li>
            </>
            :
            <>
              <li><Link className="navLink" to='/Login'>Login</Link></li>
              <li><Link className="navLink" to='/SignUp'>SignUp</Link></li>
              <li><Link className="navLink" to='/SearchRecipe'>All Recipes</Link></li>
            </>
          }

          </ul>
        </div>
      </div>
    </div>

  )

}

export default Navbar