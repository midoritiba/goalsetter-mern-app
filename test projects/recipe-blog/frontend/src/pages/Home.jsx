import { Link } from 'react-router-dom'
import picHome from '../assets/hero_woman.jpg'
import Categories from '../components/Categories'
import LatestRecipes from '../components/LatestRecipes'
import Category from '../components/Category'
import Publish from '../components/Publish'

const Home = () => {
  return (
    <div className="row flex-lg-row-reverse align-items-center g-5 py-4 mb-4">
        <div className="col-12 col-lg-6">
            <img src={picHome} alt="cooking hero" width="1200" height="800" className="d-block mx-lg-auto img-fluid" loading="lazy" />
        </div>
        <div className="col-12 col-lg-6">
         <h1 className="display-5 fw-bold mb-3">
             Huge selection of delicious recipe ideas
         </h1>
         <p className="lead">
             Explore our huge selection of delicious recipe ideas including: breakfest ideas, quick & easy , delicious vegan & vegetarian dinner ideas, gorgeous pasta, family-friendly meals and many more!
         </p>
         <div className="d-grid gap-2 d-md-flex justify-content-md-start" >
             <Link to="/explore-latest" className="btn btn-primary btn-dark btn-lg px-4 mb-md-2">Explore Latest</Link>
             <Link to="/explore-random" className="btn btn-outline-secondary  btn-lg px-4 mb-md-2">Show Random</Link>
         </div>
         
     </div>
     <Categories />
     <LatestRecipes />
     <Category />
     <Publish />
    </div>
  )
}

export default Home