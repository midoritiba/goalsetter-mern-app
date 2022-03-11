import recipes from '../data/recipes'
import {Link} from 'react-router-dom'

const ExploreLatest = () => {

    const displayRecipes = recipes.map((recipe, id)=> {
        return (
            <Link to={`/recipe/${recipe._id}`} className="col text-center category__link">
                <div className="category__img category__img--large shadow">
                    <img src={require(`../assets/uploads/${recipe.image}`)} alt={recipe.name} loading="lazy" width="200px"/>
                </div>
                <div className="pt-1 text-dark fw-bold">{recipe.name}</div>
            </Link>
        )
    })

  return (
      
    <section class="pb-4 pt-4">
        <div class="d-flex mb-2 align-items-center">
            <h2 className="text-dark">Latest Recipes</h2>
            <Link to="/explore-latest" className="text-dark fw-bold ms-auto">View More</Link>
        </div>
        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            {displayRecipes}
        </div>
    </section>
  )
}

export default ExploreLatest