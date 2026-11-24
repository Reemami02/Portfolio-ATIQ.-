const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Allow Angular to connect to the backend.
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());

// Connect to MongoDB.
mongoose.connect('mongodb://localhost:27017/final_project')
    .then(() => {
        console.log('Database is connected');
    })
    .catch(error => {
        console.log('Database connection error:', error);
    });

// Import routes.
const user = require('./user');
const menClothing = require('./menClothing');
const womenClothing = require('./womenClothing');
const cart = require('./cart');
const contactUs = require('./contactUs');
const about = require('./about');
const orders = require('./orders');

// Use routes.
app.use('/user', user);
app.use('/men', menClothing);
app.use('/women', womenClothing);
app.use('/cart', cart);
app.use('/contactUs', contactUs);
app.use('/about', about);
app.use('/orders', orders);

app.get('/', (req, res) => {
    res.send('Clothing Store API is Running!');
});

// Handle unknown routes.
app.use((req, res) => {
    res.status(404).json({ error: 'not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
