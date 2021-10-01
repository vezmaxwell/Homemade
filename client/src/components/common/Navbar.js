import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/fork.png'

const Navbar = () => {

  return (

    <div className="navBar">
      <div className="container">
        <Link className="navLink" to='/'>


          <div className="logo-simble">
            <img src={logo} alt="" className="logo" />
          </div>
        </Link>

        <Link className="navLink" to='/'>
          <h1 className="homemade">Homemade</h1>
        </Link>

        <div className="links">
          <ul>

            <li><Link className="navLink" to='/Login'>Login</Link></li>
            <li><Link className="navLink" to='/SignUp'>SignUp</Link></li>
            <li><Link className="navLink" to='/SearchRecipe'>All Recipes</Link></li>
          </ul>
          <div className="search-bar">
            <input type="text" placeholder="Search for something..." />
          </div>

        </div>
      </div>
    </div>

  )

}

export default Navbar