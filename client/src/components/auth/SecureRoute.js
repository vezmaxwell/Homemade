import React from 'react'
import { userIsAuthenticated } from '../helpers/auth'

const SecureRoute = () => {
  userIsAuthenticated()
  return userIsAuthenticated() ? //add a recipe page : <Login />
}

export default SecureRoute