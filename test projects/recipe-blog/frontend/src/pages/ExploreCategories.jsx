import categories from '../data/dbCategories'
import {Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'

const ExploreCategories = () => {
    const displayCategories = categories.map((category, id)=> {
        return (
            <Link to={"/categories/" + category.name} className="col text-center category__link">
                <div className="category__img shadow" key={id}>
                    <img src={require(`../assets/categories/${category.img}`)} alt={category.name} loading="lazy" width="200px"/>
                </div>
                <div className="pt-1 text-dark fw-bold">{category.name}</div>
            </Link>
        )
    })
    
  return (
      <Container>
      <h1 class="pb-4"> Categories</h1>

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
            <li class="breadcrumb-item active" aria-current="page">Categories</li>
            </ol>
        </nav>
      <div class="row row-cols-2 row-cols-lg-4 g-2 g-lg-3 py-4">
          {displayCategories}
      </div>
      </Container>
  )
  
}

export default ExploreCategories