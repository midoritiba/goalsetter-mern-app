import categories from '../data/dbCategories'
import {Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'

const Categories = () => {

    const displayCategories = categories.slice(0, 5).map((category, id)=> {
        return (
            <Link to={"/categories/" + category.name} className="col text-center category__link">
                <div className="category__img shadow">
                    <img src={require(`../assets/categories/${category.img}`)} alt={category.name} loading="lazy" width="200px"/>
                </div>
                <div className="pt-1 text-dark fw-bold">{category.name}</div>
            </Link>
        )
    })
    
  return (
      <Container>
      <div class="row row-cols-2 row-cols-lg-6 g-2 g-lg-3 py-4">
          {displayCategories}
          <Link to="/categories" class="col text-center category__link">
            <div class="category__img shadow">
                <img src={require(`../assets/view-all.jpg`)} alt="Categories-view all" loading="lazy" />
            </div>
            <div class="pt-1 text-dark fw-bold">View All</div>
        </Link>
      </div>
      </Container>
  )
}

export default Categories