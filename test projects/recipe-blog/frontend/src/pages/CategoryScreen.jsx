import categories from '../data/dbCategories'
import recipes from '../data/recipes'
import { useParams, Link }from 'react-router-dom'
import {Container} from 'react-bootstrap'

const CategoryScreen = () => {
    const  {id}  = useParams();
    const category = categories.find((el) => el.name == id)
    const recipeList = recipes.filter((list) => list.category == category.name)
  return (
    <Container>
        <h1 className="pb-4">Explore Recipes</h1>

        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/categories">Categories</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{category.name}</li>
            </ol>
        </nav>
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            {recipeList.map((recipe) => 
                <Link to={`/recipe/${recipe._id}`} className="col text-center category__link pb-3">
                    <div className="category__img shadow">
                        <img src={require(`../assets/uploads/${recipe.image}`)} alt={recipe.name} loading="lazy" width="200px"/>
                    </div>
                    <div className="pt-1">{recipe.name}</div>
                </Link>
            )}
        </div>
    </Container>
  )
}

export default CategoryScreen