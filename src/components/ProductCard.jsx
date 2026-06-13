import "./ProductCard.css";

const ProductCard = ({ product, cart, setCart, fetchCart, API_URL }) => {
    const handleSetCart = async () => {
        try {
            const response = await fetch(`${API_URL}/cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product, quantity: 1 }),
            });
            if (!response.ok) {
                throw new Error(`Failed to add to cart: ${response.status}`);
            }
            await fetchCart();
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    return (
        <article className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                ></img>
            </div>
            <div className="product-content">
                <span className="product-category">{product.category}</span>
                <h2 className="product-title">{product.title}</h2>
                <p className="product-price">${product.price}</p>
                <button className="add-cart" onClick={handleSetCart}>
                    Add to cart
                </button>
            </div>
        </article>
    );
};

export default ProductCard;
