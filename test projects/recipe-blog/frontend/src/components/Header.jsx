import {Link} from 'react-router-dom'
import logo from '../assets/header_logo.png'


const Header = () => {
  return (
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <Link to='/' className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <img src={logo} alt="logo" width="229" height="220" />
            </Link>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-o">
                <li>
                    <Link to='/' className="nav-link px-2 link-secondary">Home</Link>
                </li>
                <li>
                    <Link to='/submit' className="nav-link px-2 link-secondary">Submit</Link>
                </li>
                <li>
                    <Link to='/about' className="nav-link px-2 link-secondary">About</Link>
                </li>
            </ul>
            <div className="col-md-3 text-end">
                <form method="POST" action="/search">
                    <input type="search" name="searchTerm" className="form-control" placeholder="Search..." aria-label="Search" />
                </form>
            </div>
        </header>
  )
}

export default Header