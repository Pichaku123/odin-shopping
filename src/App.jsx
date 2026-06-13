import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [cart, setCart] = useState([]);
    const API_URL = "http://localhost:8000/api";

    // Fetch cart from backend on mount
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await fetch(`${API_URL}/cart`);
            if (!response.ok) {
                throw new Error(`Failed to fetch cart: ${response.status}`);
            }
            const data = await response.json();
            setCart(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            setCart([]);
        }
    };

    return (
        <div className="app">
            <Navbar />
            <main className="app-content">
                <Outlet context={{ cart, setCart, fetchCart, API_URL }} />
            </main>
        </div>
    );
}

export default App;
