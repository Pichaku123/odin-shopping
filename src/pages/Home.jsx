import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <section className="home-hero">
                <h1>Welcome to Our Store</h1>
                <p>Discover amazing products</p>
                <Link to="products" className="home-cta">
                    Check out the store!
                </Link>
            </section>
        </div>
    );
};

export default Home;
