## **Homemade**

**Overview**
A recipe website application where users can login in order to add recipes and leave reviews and customise their profile. 

**Technologies Used**

 - HTML5
 - CSS 
 - SASS
 - React JS
 - JavaScript
 - Express JS 
 - Node
 - Mongo DB
 - Yarn
 - Git
 - Github
 - Google Fonts 
 - Photoshop

**Homemade**

<img width="1674" alt="Screenshot 2021-11-04 at 11 23 05" src="https://user-images.githubusercontent.com/81028718/140305373-e5ea1961-619f-41c9-962f-9f6dadfa7e93.png">

**Day 1**

Day 1 was planning day. Iury came up with the idea of a recipe site quickly, so we started by looking at other recipe sites for inspiration. We had a main site we used for referencing (bon appetit). I made some photoshop mockups of site design for us to reference towards which everyone contributed ideas to.

![homemade_singleRecipe](https://user-images.githubusercontent.com/81028718/140305746-2fd8247d-4356-4270-8cfa-5d22979c39ed.png)


**Day 2 - 3**
Days 2-3 were coded with a shared screen in order to build the back-end using Express JS and Mongo DB. We coded this together via screen-sharing in order to avoid any clashing and so we all knew where everything was when it came to implementing the front end. These days included making the recipe and review schemas with a few seeded recipes so that we had some content to work with whilst building the front-end. 

    const  reviewSchema  =  new  mongoose.Schema({

    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: 		true },
    text: { type: String, maxlength: 400 },
    rating: { type: Number, min: 1, max: 5, required: true },
    image: { type: String }
    }, {
	    timestamps: true
    })
      
    const  recipeSchema  =  new  mongoose.Schema({
    	name: { type: String, required: false, unique: true },
    	summary: { type: String, maxlength: 500 },
    	vegan: { type: Boolean, required: true },
    	vegetarian: { type: Boolean, required: true },
    	ingredients: [{ type: String, required: true }],
    	time: { type: Number, required: true },
    	image: { type: String, required: true },
    	cuisine: { type: String, required: true },
    	method: [{ type: String, required: true }],
    	difficulty: { type: String, required: true },
    	serves: { type: Number },
    	owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
    	reviews: [reviewSchema]
    })


**Day 4**
Day 4 we began to build the front-end using React JS. We started by planning out the main components we were going to need: nav-bar, login, sign-up, footer, home, auth, image upload, profile, profile-edit, recipe-edit, recipe-new, search-recipe, single-recipe, review-edit, review-new, stars, user-profile. 

We started by focusing on nav-bar, reviews, login, homepage. My focus for this day was on the nav-bar and the login form. 

<img width="880" alt="Screenshot 2021-11-04 at 11 33 10" src="https://user-images.githubusercontent.com/81028718/140306545-567b155f-c6ad-48b2-8208-e5eec4a56422.png">

**Day 5**
Day 5 we created virtual fields for the average ratings, map methods for the reviews and filter methods for all recipes. The filter and map methods were used on the all recipes page in order to filter in different ways what recipes you would want to look at. We made the nav-bar functional and connected the built components to the links and added a carousel for the homepage. 

<img width="1680" alt="Screenshot 2021-11-04 at 11 34 18" src="https://user-images.githubusercontent.com/81028718/140306678-d4315c5f-b78d-426e-b7a2-6677a9f010df.png">

**Day 6**
On day 6 authentication and the secure route were worked on. Login, signup and review components were connected with this. The add reviews section was also added to the bottom of each recipe page. With the authentication sorted, I made sure the nav-bar was also made to change when somebody logins so they could see logout and create recipe.

    <Link  className="navLink"  to='/'>    
	    <div  className="logo-container">    
		    <img  src={logo}  alt=""  className="logo"  />    
	    </div>    
    </Link>    
              
    <ul>              
	    {    
	    userIsAuthenticated() ?    
		    <ul  className="nav-links-authenticated">    
			    <li  className="navLink"  onClick={handleLogout}>Logout</li>    
			    <li  className="navLink"><Link  to='/addRecipe'>Add Recipe</Link></li>    
			    <li  className="navLink"><Link  to='/SearchRecipe'>All Recipes</Link></li>    
			    <li  className="navLink"><Link  to='/profile'>My Profile</Link></li>    
		    </ul>    
		    :    
		    <ul  className="nav-links-authenticated">    
			    <li  className="navLink"><Link  to='/Login'>Login</Link></li>    
			    <li  className="navLink"><Link  to='/SignUp'>SignUp</Link></li>    
			    <li  className="navLink"><Link  to='/SearchRecipe'>All Recipes</Link></li>    
		    </ul>    
		 }             
		</ul>
	  </div
    </div>

The star rating system was added so you could see what the average star ratings for each recipe were. 

**Day 7**
We started by designing the all recipes page together by screen sharing photoshop. Then focused on searching for all recipes using the filter method. I added the functionality to the forms. New forms were added for creating recipes and adding reviews following the same format as the other forms. 

Later in the day we screen shared to begin making the website responsive for different screen sizes.

**Day 8**
The add review component was completed. The load more function was added so that the all recipes page doesn't display an endless stream of recipes. Login and signup errors were added. General css was tidied up and added in, better quality photos were added in and we finished making it responsive.


**Day 9**
On day 9 we added some final functionality. On each recipe page the recipe displayed the owner of the recipe which lead to the owners profile. We added in a way for people to change their name and profile image. We added in some more seeds to fill out the site some more.  

<img width="819" alt="Screenshot 2021-11-04 at 13 19 14" src="https://user-images.githubusercontent.com/81028718/140320273-df41ff0d-02d1-4bf3-b299-0f33ef6bff4a.png">

<img width="1677" alt="Screenshot 2021-11-04 at 13 19 59" src="https://user-images.githubusercontent.com/81028718/140320395-4242d53e-bf0a-459a-9334-5b27ce415b20.png">


**Strengths and issues**

All in all the week was fun and we created a well functioning project. We would have zooms in the morning, make clear what we wanted to each get done and then touch base as the day went on and we progressed with our tasks. As this was the first project to work as a group whilst pushing to git, we ran into problems sometimes with merge conflicts. This was problem our biggest problem through the week so all in all, a good project.