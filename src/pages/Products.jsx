import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useOutletContext } from "react-router-dom";
import "./Products.css";

const Products = () => {
    const { cart, setCart } = useOutletContext();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(
                    "https://fakestoreapi.com/products",
                );
                if (!response.ok) {
                    throw new Error(`HTTP error, status= ${response.status}`);
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error("Fetch failed", error);
            }
        };

        fetchItems();
    }, []);

    const { fetchCart, API_URL } = useOutletContext();

    return (
        <section className="products-container">
            <h1>Products</h1>
            <div className="products-grid">
                {items.map((item) => (
                    <ProductCard
                        key={item.id}
                        product={item}
                        cart={cart}
                        setCart={setCart}
                        fetchCart={fetchCart}
                        API_URL={API_URL}
                    />
                ))}
            </div>
        </section>
    );
};

export default Products;
