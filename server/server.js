import express from "express";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

//Just a mock DB
let cart = [];
let nextId = 1;


//GET all cart items
app.get("/api/cart", (req, res) => {
    res.json(cart);
});

// GET single cart item by ID
app.get("/api/cart/:id", (req, res) => {
    const item = cart.find((item) => item.id === parseInt(req.params.id));

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
});

// POST to add to cart
app.post("/api/cart", (req, res) => {
    const { product, quantity } = req.body;

    if (!product || !product.id || !product.title || !product.price) {
        return res.status(400).json({
            message: "Invalid product data",
        });
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity || 1;
        return res.json(cart);
    }

    const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity || 1,
        category: product.category,
        addedAt: new Date(),
    };

    cart.push(newItem);
    res.status(201).json(cart);
});

// PUT to update item
app.put("/api/cart/:id", (req, res) => {
    const item = cart.find((item) => item.id === parseInt(req.params.id));

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    // Update quantity if provided
    if (req.body.quantity !== undefined) {
        item.quantity = parseInt(req.body.quantity);
    }

    res.json(cart);
});

//DELETE 
app.delete("/api/cart/:id", (req, res) => {
    const index = cart.findIndex((item) => item.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Item not found" });
    }

    cart.splice(index, 1);
    res.json(cart);
});

//DELETE all cart
app.delete("/api/cart", (req, res) => {
    const itemCount = cart.length;
    cart = [];
    res.json({ message: `Cart cleared (${itemCount} items removed)` });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

//port is 8000 for now
app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
    console.log(`API available at localhost:${PORT}/api/cart`);
});
