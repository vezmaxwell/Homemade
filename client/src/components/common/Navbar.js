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



  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  return (

    <div className="navBar-container">

      {/* Logo Name */}

      <div className="homemade-container">
        <Link className="navLink" to='/'>
          <img src={homemade} alt="" className="homemade-logo" />
        </Link>
      </div>

      {/* Navigation Links */}

      <div className="links">

        {/* Logo Img */}
        <Link className="navLink" to='/'>
          <div className="logo-container">
            <img src={logo} alt="" className="logo" />
          </div>
        </Link>

        <ul>

          {
            userIsAuthenticated() ?
              <ul className="nav-links">
                <li className="navLink" onClick={handleLogout}>Logout</li>
                <li className="navLink"><Link to='/addRecipe'>Add Recipe</Link></li>
                <li className="navLink"><Link to='/SearchRecipe'>All Recipes</Link></li>
                <li className="navLink"><Link to='/profile'>My Profile</Link></li>
              </ul>
              :
              <ul className="nav-links">
                <li className="navLink"><Link to='/Login'>Login</Link></li>
                <li className="navLink"><Link to='/SignUp'>SignUp</Link></li>
                <li className="navLink"><Link to='/SearchRecipe'>All Recipes</Link></li>
              </ul>
          }

        </ul>
      </div>
    </div>

  )

}

export default Navbar