import recipes from '../data/recipes'
import {Container} from 'react-bootstrap'
import { useParams }from 'react-router-dom'

const Recipe = () => {
  const  {id}  = useParams();
  const recipe = recipes.find((el) => el._id == id)

  return (
    <Container>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">{recipe.name} </li>
            </ol>
          </nav>
          <div className="row">
        <div className="col-12 col-md-4">
            <img src={require(`../assets/uploads/${recipe.image}`)} alt={recipe.name} className="img-fluid sticky-top" Loading="lazy" />
        </div>

        <div className="col-12 col-md-8">
            <div className="row">
                <div className="col-12">
                    <h1>{recipe.name}</h1>
                </div>
                <div className="col-12 mb-4"><i className="bi bi-tag">{recipe.category}</i></div>
                <div className="col-12" >
                    <h4>Cooking Instructions</h4>
                    {recipe.desc}
                </div>
            </div>

            <div className="row pt-4">
                <div className="col-12">
                    <h4>Ingredients</h4>
                    <ul className="list-group list-group-flush">
                        {recipe.ingredients.map((ingredient) => 
                            <li className="list-group-item">
                                {ingredient}
                            </li>
                        ) }
                    </ul>
                </div>
            </div>
        </div>

    </div>
    </Container>
  )
}

export default Recipe