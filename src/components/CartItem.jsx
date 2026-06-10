import "./CartItem.css";

const CartItem = ({ product, cart, setCart }) => {
    const handleQuantity = (quantity) => {
        const newQuantity = quantity + product.quantity;
        if (newQuantity <= 0)
            setCart(cart.filter((i) => i.id !== product.id)); //returns the other items with diff id
        else
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item,
                ),
            );
    };

    const handleRemove = () => {
        setCart(cart.filter((item) => item.id !== product.id));
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
