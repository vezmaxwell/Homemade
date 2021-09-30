import React from 'react'

const Login = () => {


  return (
    <>
      <div className="loginPage">

      <div className="form-header">
        <h2>Login to your account.</h2>

        <h3>Don't have an account? 
          <a href="/">Get one here.</a> 
        </h3> 
        
        </div>

        <div className="form-container">

        <form action="">
          <div className="formfield">
            <p>Email</p>
            <input type="text" placeholder="Your email goes here"/>
          </div>
        
          <div className="formfield">
            <p>Password</p>
            <input type="text" placeholder="Your email goes here"/>
          </div>

          <button className="form-button">LOGIN</button>

        </form>    
        </div>

      </div>
    </>
  )
}

export default Login