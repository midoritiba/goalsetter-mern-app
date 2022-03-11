import {Container} from 'react-bootstrap'

const Submit = () => {
  return (
    <Container className="mb-5">
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Submit your recipe</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead">Share your amazing recipes accross the world. Fill our form to get started.</p>
        </div>
      </div>
      <div class="row justify-content-center">

      <div className="col-8">

      <form action="/submit-recipe" enctype="multipart/form-data" method="POST">

          <div className="row g-3">

              <div className="col-12">
                  <label for="email" className="form-label">Email</label>
                  <input required type="email" name="email" id="email" className="form-control" />
              </div>

              <div className="col-12">
                  <label for="name" className="form-label">Recipe name</label>
                  <input required type="text" name="name" id="name" className="form-control" />
              </div>

              <div className="col-12">
                  <label for="desc" className="form-label">Description</label>
                  <textarea required className="form-control" name="desc" id="desc" cols="30" rows="4"></textarea>
              </div>

              <div className="col-12">
                  <label for="ingredients" className="form-label">Ingredients</label><br/>
                  <small>Example: Eggs </small>
                  <div className="ingredientList">
                      <div className="ingredientDiv mb-1">
                          <input required type="text" name="ingredients" id="ingredients" className="form-control" />
                      </div>
                  </div>
          </div>

              <div className="col-12">
                  <button type="button" className="btn btn-outline-primary" id="addIngredientsBtn">+ Ingredient</button>
              </div>

              <div className="col-12">
                  <label for="category" className="pb-2">Select Category</label>
                  <select className="form-select form-control" name="category" aria-label="Category">
                      <option selected>Select Category</option>
                      <option value="BBQ & Grill">BBQ & Grill</option>        
                      <option value="Breakfast">Breakfast</option>  
                      <option value="Desserts">Desserts</option>  
                      <option value="Mains">Mains</option>  
                      <option value="Pasta">Pasta</option>  
                      <option value="Snacks">Snacks</option>  
                      <option value="Starters">Starters</option>  
                  </select>
              </div>

              <div className="col-12">
                  <label for="image"className="pb-2">Product Image</label>
                  <input type="file" className="form-control" name="image" accept="image/*" />
              </div>

              <div className="col-12">
                  <button type="submit" className="btn btn-primary">Submit Recipe</button>
              </div>
        </div> 

      </form>

      </div>
      </div>
    </Container>
  )
}

export default Submit