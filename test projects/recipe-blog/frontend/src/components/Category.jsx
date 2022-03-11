import categories from '../data/dbCategories'
import recipes from '../data/recipes'
import {Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'

const Category = () => {

  return (
      <Container>
    <section class="pb-4 py-4">

        {categories.map((category, id) =>{
            return(
                <div claName="py-2">
                <div class="d-flex mb-2 align-items-center">
                    <h2>{category.name}</h2>
                    <Link to={"/" + category.name} className="ms-auto text-dark fw-bold">View More</Link>
                </div>
                <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {recipes.map((recipe, id)=> {
                        return (
                            (recipe.category === category.name) && (
                                <Link to={"/recipe/" + recipe._id} className="col text-center category__link">
                                <div className="category__img category__img--large shadow">
                                    <img src={require(`../assets/uploads/${recipe.image}`)} alt={recipe.name} loading="lazy" width="200px"/>
                                </div>
                                <div className="py-2 text-dark fw-bold">{recipe.name}</div>
                                </Link>
                            ))
                    })
                    }
                </div>
                </div>
            )
        })}

    </section>
    </Container>
  )
}

export default Category