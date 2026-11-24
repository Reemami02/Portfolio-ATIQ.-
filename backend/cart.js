
const mongoose = require('mongoose');
const router = require('express').Router();


// Models
require('./user');
require('./menClothing');
require('./womenClothing');

const User = mongoose.model('User');
const MenClothing = mongoose.model('MenClothing');
const WomenClothing = mongoose.model('WomenClothing');


// Schema
const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: 'items.productType',
                required: true
            },

            productType: {
                type: String,
                enum: ['MenClothing', 'WomenClothing'],
                required: true
            },

            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]

});


const Cart = mongoose.model('Cart', cartSchema);


// Add To Cart
router.post('/add', async (req, res) => {
    try {

        const { userId, productId, productType, quantity = 1 } = req.body;

        const myUser = await User.findById(userId);

        if (!myUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        if (!['MenClothing', 'WomenClothing'].includes(productType)) {
            return res.status(400).json({
                message: 'Invalid product type'
            });
        }

        // Get Product Model
        const Product = productType === 'MenClothing'
            ? MenClothing
            : WomenClothing;

        // Check Product
        const myProduct = await Product.findById(productId);

        if (!myProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Check Quantity
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                message: 'Quantity must be a positive integer'
            });
        }

        if (quantity > myProduct.stock) {
            return res.status(400).json({
                message: 'Not enough stock'
            });
        }

        // Find User Cart
        let myCart = await Cart.findOne({ userId });

        // Create New Cart
        if (!myCart) {

            myCart = new Cart({
                userId,
                items: [{
                    productId,
                    productType,
                    quantity
                }]
            });

        }

        else {

            // Check If Product Already Exists
            const existingItem = myCart.items.find(item =>
                item.productId.toString() === productId &&
                item.productType === productType
            );

            if (existingItem) {

                if (existingItem.quantity + quantity > myProduct.stock) {
                    return res.status(400).json({
                        message: 'Not enough stock'
                    });
                }

                existingItem.quantity += quantity;

            }

            else {

                myCart.items.push({
                    productId,
                    productType,
                    quantity
                });

            }

        }

        const updatedCart = await myCart.save();

        res.status(201).json({
            message: 'Product added to cart successfully',
            updatedCart
        });

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
});


// Get User Cart
router.get('/:userId', async (req, res) => {
    try {

        const userId = req.params.userId;

        const myCart = await Cart.findOne({ userId })
            .populate('items.productId')
            .populate('userId', 'name email');

        if (!myCart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        // Calculate Total Price
        let totalPrice = 0;

        myCart.items.forEach(item => {

            totalPrice += item.productId.price * item.quantity;

        });

        res.status(200).json({
            myCart,
            totalPrice
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});


// Update Cart Quantity
router.put('/update', async (req, res) => {
    try {

        const { userId, productId, productType, quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                message: 'Quantity must be a positive integer'
            });
        }

        if (!['MenClothing', 'WomenClothing'].includes(productType)) {
            return res.status(400).json({
                message: 'Invalid product type'
            });
        }

        const myCart = await Cart.findOne({ userId });

        if (!myCart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        const existingItem = myCart.items.find(item =>
            item.productId.toString() === productId &&
            item.productType === productType
        );

        if (!existingItem) {
            return res.status(404).json({
                message: 'Product not found in cart'
            });
        }

        const Product = productType === 'MenClothing'
            ? MenClothing
            : WomenClothing;

        const myProduct = await Product.findById(productId);

        if (!myProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        if (quantity > myProduct.stock) {
            return res.status(400).json({
                message: 'Not enough stock'
            });
        }

        existingItem.quantity = quantity;

        const updatedCart = await myCart.save();

        res.status(200).json({
            message: 'Cart updated successfully',
            updatedCart
        });

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
});


// Remove Product From Cart
router.delete('/remove', async (req, res) => {
    try {

        const { userId, productId, productType } = req.body;

        const myCart = await Cart.findOne({ userId });

        if (!myCart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        const itemIndex = myCart.items.findIndex(item =>
            item.productId.toString() === productId &&
            item.productType === productType
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                message: 'Product not found in cart'
            });
        }

        myCart.items.splice(itemIndex, 1);

        const updatedCart = await myCart.save();

        res.status(200).json({
            message: 'Product removed successfully',
            updatedCart
        });

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
});


// Clear Cart
router.delete('/clear/:userId', async (req, res) => {
    try {

        const userId = req.params.userId;

        const myCart = await Cart.findOne({ userId });

        if (!myCart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        myCart.items = [];

        const updatedCart = await myCart.save();

        res.status(200).json({
            message: 'Cart cleared successfully',
            updatedCart
        });

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
});


module.exports = router;
