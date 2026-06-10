import "./ProductCard.css";

const ProductCard = ({ product, cart, setCart }) => {
    const handleSetCart = () => {
        const exists = cart.find((item) => item.id === product.id);
        if (exists) {
            //find product, if id in arr is diff than product.id, keep it same, else update quantity
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                ),
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]); //first item
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
