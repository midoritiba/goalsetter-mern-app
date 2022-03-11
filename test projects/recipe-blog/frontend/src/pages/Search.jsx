import recipes from '../data/recipes'
import {Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'

const Search = () => {
    const count = recipes.length
    const idNum = Math.floor(Math.random()*count)
    const recipe = recipes[idNum]
  return (
    <Container className="pb-3">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Search Recipe</li>
        </ol>
    </nav>
    <h1 class="pb-4">Random Recipe </h1>
    <Link to={"/recipe" + recipe._id} className="col text-center category__link">
            <div className="category__img category__img--large shadow">
                <img src={require(`../assets/uploads/${recipe.image}`)} alt={recipe.name} loading="lazy" width="200px"/>
            </div>
            <div className="pt-1 text-dark fw-bold fs-3">
                {recipe.name}
            </div>
    </Link>
</Container>
  )
}

export default Search