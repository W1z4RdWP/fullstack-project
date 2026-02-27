import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className='navbar-ul'>
                <Link to={'/'}>
                    <li>Home</li>
                </Link>
                <Link to={'/about'}>
                    <li>About us</li>
                </Link>
                <Link to={'/profile'}>
                    <li>Profile</li>
                </Link>
            </ul>
        </nav>

    )
}

export default Navbar;