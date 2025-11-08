// import mongoose from 'mongoose';
// import express from 'express';
// import cors from 'cors';
// import JWT from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

// const app = express();
// const Jwtkey = 'ecomm';

// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('✅ MongoDB Connected'))
//     .catch(err => console.error('❌ MongoDB Connection Error:', err));

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// });

// const productSchema = new mongoose.Schema({
//     name: String,
//     price: Number,
//     category: String,
//     UserId: String,
//     company: String
// });

// const User = mongoose.model('users', userSchema);
// const Product = mongoose.model('products', productSchema);

// app.post('/register', async (req, resp) => {
//     const user = new User(req.body);
//     const result = await user.save();
//     const userObj = result.toObject();
//     delete userObj.password;

//     Jwt.sign({ user: userObj }, Jwtkey, { expiresIn: "2h" }, (err, token) => {
//         if (err) {
//             return resp.status(500).send({ result: "Token generation failed" });
//         }
//         resp.send({ user: userObj, auth: token });
//     });
// });

// app.post('/login', async (req, resp) => {
//     const { email, password } = req.body;
//     if (email && password) {
//         const user = await User.findOne({ email, password }).select('-password');
//         if (user) {
//             Jwt.sign({ user }, Jwtkey, { expiresIn: "5h" }, (err, token) => {
//                 if (err) {
//                     return resp.status(500).send({ result: "Token generation failed" });
//                 }
//                 resp.send({ user, auth: token });
//             });
//         } else {
//             resp.status(404).send({ message: "No user found" });
//         }
//     } else {
//         resp.status(400).send({ message: "Email and password required" });
//     }
// });

// app.get('/profile', verifytoken, async (req, resp) => {
//     const userId = req.query.id;
//     if (!userId) {
//         return resp.status(400).send({ message: "User ID is required" });
//     }
//     const user = await User.findById(userId).select('-password');
//     if (user) {
//         resp.send(user);
//     } else {
//         resp.status(404).send({ message: "User not found" });
//     }
// });

// app.post('/addproduct', verifytoken, async (req, resp) => {
//     const product = new Product(req.body);
//     const result = await product.save();
//     resp.send(result);
// });

// app.get('/products', verifytoken, async (req, resp) => {
//     const products = await Product.find();
//     products.length > 0
//         ? resp.send(products)
//         : resp.send({ message: "No products found" });
// });

// app.get('/products/:id', verifytoken, async (req, resp) => {
//     const result = await Product.findById(req.params.id);
//     result
//         ? resp.send(result)
//         : resp.send({ message: "No product found" });
// });

// app.put('/products/:id', verifytoken, async (req, resp) => {
//     const result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
//     result.modifiedCount > 0
//         ? resp.send({ message: "Product updated successfully" })
//         : resp.send({ message: "No product found or no change made" });
// });

// app.delete('/products/:name', verifytoken, async (req, resp) => {
//     const result = await Product.deleteOne({ name: req.params.name });
//     result.deletedCount > 0
//         ? resp.send({ message: "Product deleted successfully" })
//         : resp.send({ message: "No product found with the given name" });
// });

// app.get('/search/:key', verifytoken, async (req, resp) => {
//     const result = await Product.find({
//         "$or": [
//             { name: { $regex: req.params.key, $options: "i" } },
//             { company: { $regex: req.params.key, $options: "i" } },
//             { category: { $regex: req.params.key, $options: "i" } }
//         ]
//     });
//     result.length > 0
//         ? resp.send(result)
//         : resp.send({ message: "No products found" });
// });

// function verifytoken(req, resp, next) {
//     let token = req.headers['authorization'];
//     if (token) {
//         token = token.split(' ')[1];
//         Jwt.verify(token, Jwtkey, (err) => {
//             if (err) {
//                 return resp.status(401).send({ result: "Invalid token. Please log in again." });
//             } else {
//                 next();
//             }
//         });
//     } else {
//         return resp.status(403).send({ result: "Token missing. Please add token in header." });
//     }
// }
// app.get('/',(req,res)=>{
//     res.send("Backend API is running!");
// })


// const PORT = process.env.PORT || 5400;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const Jwtkey = 'ecomm';

app.use(express.json());
app.use(cors());

// 🧩 MongoDB connection (connect only once)
if (!global._mongoConnected) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('✅ MongoDB Connected');
            global._mongoConnected = true;
        })
        .catch(err => console.error('❌ MongoDB Connection Error:', err));
}

// 🧠 Schemas
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

const User = mongoose.models.users || mongoose.model('users', userSchema);
const Product = mongoose.models.products || mongoose.model('products', productSchema);

// 🧍 User registration
app.post('/api/register', async (req, resp) => {
    const user = new User(req.body);
    const result = await user.save();
    const userObj = result.toObject();
    delete userObj.password;

    JWT.sign({ user: userObj }, Jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) return resp.status(500).send({ result: "Token generation failed" });
        resp.send({ user: userObj, auth: token });
    });
});

// 🔑 Login
app.post('/api/login', async (req, resp) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = await User.findOne({ email, password }).select('-password');
        if (user) {
            JWT.sign({ user }, Jwtkey, { expiresIn: "5h" }, (err, token) => {
                if (err) return resp.status(500).send({ result: "Token generation failed" });
                resp.send({ user, auth: token });
            });
        } else {
            resp.status(404).send({ message: "No user found" });
        }
    } else {
        resp.status(400).send({ message: "Email and password required" });
    }
});

// 👤 Profile
app.get('/api/profile', verifytoken, async (req, resp) => {
    const userId = req.query.id;
    if (!userId) return resp.status(400).send({ message: "User ID is required" });

    const user = await User.findById(userId).select('-password');
    user ? resp.send(user) : resp.status(404).send({ message: "User not found" });
});

// 📦 Add Product
app.post('/api/addproduct', verifytoken, async (req, resp) => {
    const product = new Product(req.body);
    const result = await product.save();
    resp.send(result);
});

// 📃 Get all products
app.get('/api/products', verifytoken, async (req, resp) => {
    const products = await Product.find();
    products.length > 0
        ? resp.send(products)
        : resp.send({ message: "No products found" });
});

// 🔍 Search products
app.get('/api/search/:key', verifytoken, async (req, resp) => {
    const result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key, $options: "i" } },
            { company: { $regex: req.params.key, $options: "i" } },
            { category: { $regex: req.params.key, $options: "i" } }
        ]
    });
    result.length > 0
        ? resp.send(result)
        : resp.send({ message: "No products found" });
});

// ✏️ Update product
app.put('/api/products/:id', verifytoken, async (req, resp) => {
    const result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
    result.modifiedCount > 0
        ? resp.send({ message: "Product updated successfully" })
        : resp.send({ message: "No product found or no change made" });
});

// ❌ Delete product
app.delete('/api/products/:name', verifytoken, async (req, resp) => {
    const result = await Product.deleteOne({ name: req.params.name });
    result.deletedCount > 0
        ? resp.send({ message: "Product deleted successfully" })
        : resp.send({ message: "No product found with the given name" });
});

// ✅ Root route
app.get('/api', (req, res) => {
    res.send("✅ Backend API is running on Vercel!");
});

// 🔒 JWT Middleware
function verifytoken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        JWT.verify(token, Jwtkey, (err) => {
            if (err) return resp.status(401).send({ result: "Invalid token. Please log in again." });
            next();
        });
    } else {
        return resp.status(403).send({ result: "Token missing. Please add token in header." });
    }
}

// 🟢 Export handler (no app.listen)
export default app;
