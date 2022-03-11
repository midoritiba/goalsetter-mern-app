import recipes from '../data/recipes'
import {Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'

const ExploreLatest = () => {

    const displayRecipes = recipes.slice(0, 5).map((recipe, id)=> {
        return (
            <Link to={`recipe/${recipe._id}`} className="col text-center category__link">
                <div className="category__img category__img--large shadow">
                    <img src={require(`../assets/uploads/${recipe.image}`)} alt={recipe.name} loading="lazy" width="200px"/>
                </div>
                <div className="pt-1 text-dark fw-bold">{recipe.name}</div>
            </Link>
        )
    })

  return (
      <Container>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
            <li class="breadcrumb-item active" aria-current="page">Latest Recipes</li>
            </ol>
        </nav>
      
        <section class="pb-4 pt-4">
            <div class="d-flex mb-2 align-items-center">
                <h2 className="text-dark">Latest Recipes</h2>
            </div>
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                {displayRecipes}
            </div>
        </section>
    </Container>
  )
}

export default ExploreLatest