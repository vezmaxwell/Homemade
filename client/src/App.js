
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//* Componenets
import Navbar from './components/common/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import SearchRecipe from './components/SearchRecipe'
import SingleRecipe from './components/SingleRecipe'


function App() {

  return (

    <div className='site-wrapper'>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/signUp'>
            <SignUp />
          </Route>
          <Route exact path='/searchRecipe'>
            <SearchRecipe />
          </Route>
          <Route exact path='/searchRecipe/:id'>
            <SingleRecipe />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )

}
export default App


