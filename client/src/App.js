
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//* Componenets
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'

import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import SearchRecipe from './components/recipes/SearchRecipe'
import SingleRecipe from './components/recipes/SingleRecipe'
import RecipeNew from './components/recipes/RecipeNew'
import RecipeEdit from './components/recipes/RecipeEdit'
import ReviewNew from './components/reviews/ReviewNew'
import Profile from './components/helpers/Profile'
import UserProfile from './components/userProfile'
import Footer from './components/common/Footer'

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
          <Route exact path='/addRecipe'>
            <RecipeNew />
          </Route>
          <Route exact path='/searchRecipe'>
            <SearchRecipe />
          </Route>
          <Route exact path='/searchRecipe/:id'>
            <SingleRecipe />
          </Route>
          <Route exact path='/searchRecipe/:id/edit'>
            <RecipeEdit />
          </Route>
          <Route exact path='/searchRecipe/:id/review'>
            <ReviewNew />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
          <Route exact path='/user/:id'>
            <UserProfile />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  )

}
export default App


