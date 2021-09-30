import React from 'react'

const SignUp = () => {


  return (
    <>
    <>
      <div className="signUpPage">

      <div className="form-header sign-up-form-header">
        <h2>Login to your account.</h2>

        <h3>Don't have an account? 
          <a href="/">Get one here.</a> 
        </h3> 
        
        </div>

        <div className="form-container sign-up-form-container">

        <form action="">

          <div className="formfield">
            <p>Email</p>
            <input type="text" placeholder="Your email goes here"/>
          </div>

          <div className="formfield">
            <p>Username</p>
            <input type="text" placeholder="Your username goes here"/>
          </div>
        
          <div className="formfield">
            <p>Password</p>
            <input type="text" placeholder="Your email goes here"/>
          </div>

          <div className="formfield">
            <p>Password Confirmation</p>
            <input type="text" placeholder="Confirm your password"/>
          </div>

          <button className="form-button">LOGIN</button>

        </form>    
        </div>

      </div>
    </>
    </>
  )
}

export default SignUp