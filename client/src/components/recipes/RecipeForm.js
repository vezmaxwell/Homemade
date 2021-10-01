import React from 'react'
import ImageUpload from '../helpers/ImageUpload'

const RecipeForm = ({ handleSubmit, handleChange, errors, formData, title, btnText, handleImageURL }) => {
  return (
    <>
    <>
      <div className="signUpPage">

      <div className="form-header sign-up-form-header">
        <h2>{title}</h2> 
        
        </div>

        <div className="form-container sign-up-form-container">

        <form onSubmit={handleSubmit}>

          <div className="formfield">
            <p>Recipe Name</p>
            <input onInput={handleChange} name="name" type="text" placeholder="Recipe Name"/>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="formfield">
            <p>Summary</p>
            <textarea onInput={handleChange} name="summary" type="text" placeholder="Summary" maxLength="500"/>
            {errors.summary && <p className="error">{errors.summary}</p>}
          </div>
        
          <div className="formfield">
            <p>Ingredients</p>
            <input name="ingredients" type="text" placeholder="Ingredients ex: 1 pepper, 2 cloves of garlic,..."/>
            {errors.ingredients && <p className="error">{errors.ingredients}</p>}
          </div>

          <div className="formfield">
            <p>Time</p>
            <input onInput={handleChange} name="time" type="number" placeholder="Time in mins"/>
            {errors.time && <p className="error">{errors.time}</p>}
          </div>

          <div className="formfield">
            <p>Cuisine</p>
            <input onInput={handleChange} name="cuisine" type="text" placeholder="Ingredients ex: 1 pepper, 2 cloves of garlic,..."/>
            {errors.cuisine && <p className="error">{errors.cuisine}</p>}
          </div>

          <div className="formfield">
            <p>Method</p>
            <input onInput={handleChange} name="method" type="text" placeholder="Method ex: 1 pepper, 2 cloves of garlic,..."/>
            {errors.method && <p className="error">{errors.method}</p>}
          </div>

          <div className="formfield">
            <p>Difficulty</p>
            <input onInput={handleChange} name="difficulty" type="text" placeholder="Difficulty"/>
            {errors.difficulty && <p className="error">{errors.difficulty}</p>}
          </div>
          
          <div className="formfield">
            <p>Vegetarian</p>
            <input onInput={handleChange} name="vegetarian" type="checkbox" />
            {errors.vegetarian && <p className="error">{errors.vegetarian}</p>}
          </div>

          <div className="formfield">
            <p>Vegan</p>
            <input onInput={handleChange} name="vegan" type="checkbox" />
            {errors.vegan && <p className="error">{errors.vegan}</p>}
          </div>

          <div className="formfield">
          <ImageUpload 
              value={formData.image}
              name="image"
              handleImageURL={handleImageURL}
          />
          </div>

          <button className="form-button">{btnText}</button>

        </form>    
        </div>

      </div>
    </>
    </>
  )
}

export default RecipeForm