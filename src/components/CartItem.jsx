import "./CartItem.css";
import { useOutletContext } from "react-router-dom";

const CartItem = ({ product, cart, setCart, API_URL }) => {
    const { fetchCart } = useOutletContext();

    const handleQuantity = async (quantity) => {
        const newQuantity = quantity + product.quantity;
        try {
            if (newQuantity <= 0) {
                const response = await fetch(`${API_URL}/cart/${product.id}`, {
                    method: "DELETE",
                });
                if (!response.ok) throw new Error("Failed to delete");
                await fetchCart();
            } else {
                const response = await fetch(`${API_URL}/cart/${product.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quantity: newQuantity }),
                });
                if (!response.ok) throw new Error("Failed to update");
                await fetchCart();
            }
        } catch (error) {
            console.error("Failed to update cart:", error);
        }
    };

    const handleRemove = async () => {
        try {
            const response = await fetch(`${API_URL}/cart/${product.id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to remove");
            await fetchCart();
        } catch (error) {
            console.error("Failed to remove from cart:", error);
        }
    };

    return (
        <li className="cart-item">
            <div className="cart-item-info">
                <h3 className="cart-item-title">{product.title}</h3>
                <p className="cart-item-price">${product.price}</p>
            </div>
            <div className="cart-item-controls">
                <button className="qty-btn" onClick={() => handleQuantity(-1)}>
                    -
                </button>
                <span className="cart-item-quantity">{product.quantity}</span>
                <button className="qty-btn" onClick={() => handleQuantity(1)}>
                    +
                </button>
            </div>
            <button className="remove-btn" onClick={handleRemove}>
                Remove
            </button>
        </li>
    );
};

export default CartItem;
