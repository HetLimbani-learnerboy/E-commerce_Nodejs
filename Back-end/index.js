const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Jwt = require('jsonwebtoken');
const app = express();
const Jwtkey = 'ecomm';

app.use(express.json());
app.use(cors());

const insertindb = async () => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce');

    // Define Schemas
    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String
    });

    const productSchema = new mongoose.Schema({
        name: String,
        price: Number,
        category: String,
        UserId: String,
        company: String
    });

    // Define Models
    const User = mongoose.model('users', userSchema);
    const Product = mongoose.model('products', productSchema);

    // Register Endpoint
app.post('/register', async (req, resp) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password; // Remove password from the response
        Jwt.sign({ result }, Jwtkey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                resp.status(500).send({ result: "Something went wrong, please try again later." });
            } else {
                resp.send({ user: result, auth: token }); // Send user and token
            }
        });
    } catch (error) {
        console.error("Error during registration:", error);
        resp.status(500).send({ result: "Failed to register user" });
    }
});

// Login Endpoint
app.post('/login', async (req, resp) => {
    try {
        if (req.body.password && req.body.email) {
            let user = await User.findOne(req.body).select('-password');
            if (user) {
                Jwt.sign({ user }, Jwtkey, { expiresIn: "5h" }, (err, token) => {
                    if (err) {
                        resp.status(500).send({ result: "Something went wrong, please try again later." });
                    } else {
                        resp.send({ user, auth: token }); // Send user and token
                    }
                });
            } else {
                resp.status(404).send({ message: "No user found" });
            }
        } else {
            resp.status(400).send({ message: "Enter email and password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        resp.status(500).send({ result: "Failed to log in" });
    }
});
app.get('/profile', verifytoken, async (req, resp) => {
    const userId = req.query.id; // Extract the user ID from the query parameter
    if (!userId) {
        return resp.status(400).send({ message: "User ID is required" });
    }

    const user = await User.findOne({ _id: userId }).select('-password'); // Exclude the password
    if (user) {
        resp.send(user);
    } else {
        resp.status(404).send({ message: "User not found" });
    }
});

    // Add Product Endpoint
    app.post('/addproduct', verifytoken, async (req, resp) => {
        let product = new Product(req.body);
        let result = await product.save();
        resp.send(result);
    });

    // Get All Products Endpoint
    app.get('/products', verifytoken, async (req, resp) => {
        let products = await Product.find();
        if (products.length > 0) {
            resp.send(products);
        } else {
            resp.send({ message: "No products found" });
        }
    });

    // Get Product by ID Endpoint
    app.get('/products/:id', verifytoken, async (req, resp) => {
        const result = await Product.findOne({ _id: req.params.id });
        if (result) {
            resp.send(result);
        } else {
            resp.send({ message: "No product found" });
        }
    });

    // Update Product Endpoint
    app.put('/products/:id', verifytoken, async (req, resp) => {
        const result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
        if (result.modifiedCount > 0) {
            resp.send({ message: "Product updated successfully" });
        } else {
            resp.send({ message: "No product found with the given ID" });
        }
    });

    // Delete Product Endpoint
    app.delete('/products/:name', verifytoken, async (req, resp) => {
        const result = await Product.deleteOne({ name: req.params.name });
        if (result.deletedCount > 0) {
            resp.send({ message: "Product deleted successfully" });
        } else {
            resp.send({ message: "No product found with the given name" });
        }
    });

    // Search Products Endpoint
    app.get('/search/:key', verifytoken, async (req, resp) => {
        let result = await Product.find({
            "$or": [
                { name: { $regex: req.params.key, $options: "i" } },
                { company: { $regex: req.params.key, $options: "i" } },
                { category: { $regex: req.params.key, $options: "i" } }
            ]
        });
        if (result.length > 0) {
            resp.send(result);
        } else {
            resp.send({ message: "No products found" });
        }
    });
};

// Middleware for Token Verification
function verifytoken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    
        Jwt.verify(token, Jwtkey, (err, valid) => {
            if (err) {
                console.error("Token verification failed:", err);
                return resp.status(401).send({ result: "Invalid token. Please log in again." });
            } else {
        
                next(); // Proceed to the next middleware or route
            }
        });
    } else {
        console.warn("No token provided");
        return resp.status(403).send({ result: "Token missing. Please add a token to the header." });
    }
}

// Start the Server
insertindb();
app.listen(5400, () => {
    console.log("Server is running on http://localhost:5400");
});