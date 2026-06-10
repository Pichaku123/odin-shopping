import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import "./App.css";

function App() {
    const [cart, setCart] = useState([]); //passed down to cart and products.
    console.log(cart);
    return (
        <div className="app">
            <Navbar />
            <main className="app-content">
                <Outlet context={{ cart, setCart }} />
            </main>
        </div>
    );
}

export default App;
