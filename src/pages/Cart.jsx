import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";
import "./Cart.css";

const Cart = () => {
    const { cart, setCart, API_URL, fetchCart } = useOutletContext();
    const total = Array.isArray(cart)
        ? cart.reduce((sum, item) => {
              return sum + (item.price || 0) * (item.quantity || 0);
          }, 0)
        : 0;

    return (
        <section className="cart-container">
            <h1>Shopping Cart</h1>
            {!Array.isArray(cart) || cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <>
                    <ul className="cart-items">
                        {cart.map((item) => (
                            <CartItem
                                key={item.id}
                                product={item}
                                cart={cart}
                                setCart={setCart}
                                API_URL={API_URL}
                            />
                        ))}
                    </ul>
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span className="total-amount">
                                ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Cart;
