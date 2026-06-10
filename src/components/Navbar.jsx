import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-link">
                    Home
                </Link>
                <Link to="/products" className="navbar-link">
                    Products
                </Link>
                <Link to="/cart" className="navbar-link">
                    Cart
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
