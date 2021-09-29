import React from 'react'

const Navbar = () => {

  return (
    <div className="navbar">

      <div className="container">

        <div className="homemade">
          <h1>Homemade</h1>
        </div>
      

        <div className="links">
          <ul>
            {/* these will be links */}
            <li>Login</li>                    
            <li>Sign Up</li>
            <li>All Recipes</li>
          </ul>

          <div className="search-bar">
            <input type="text" placeholder="Search for something..."/>
          </div>
          
        </div>

      </div>

    </div>
  )

}

export default Navbar