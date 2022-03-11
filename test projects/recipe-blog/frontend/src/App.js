import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Submit from './pages/Submit'
import Contact from './pages/Contact'
import ExploreCategories from './pages/ExploreCategories'
import ExploreLatest from './pages/ExploreLatest'
import Random from './pages/Random'
import Search from './pages/Search'
import Recipe from './pages/Recipe'
import About from './pages/About'
import CategoryScreen from './pages/CategoryScreen'

function App() {

  return (
    <div className="container-xxl px-md-5 bg-white shadow-lg">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/submit' element={<Submit/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/categories' element={<ExploreCategories/>}></Route>
          <Route path='/explore-latest' element={<ExploreLatest/>}></Route>
          <Route path='/explore-random' element={<Random/>}></Route>
          <Route path='/submit' element={<Submit/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/recipe/:id' element={<Recipe/>}></Route>
          <Route path='/categories/:id' element={<CategoryScreen/>}></Route>
          <Route path='/about' element={<About/>}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
