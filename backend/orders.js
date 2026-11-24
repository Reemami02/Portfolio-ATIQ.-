const mongoose = require('mongoose');
const router = require('express').Router();

require('./user');
require('./menClothing');
require('./womenClothing');
require('./cart');

const Order = mongoose.models.Order || mongoose.model('Order', new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        productType: {
            type: String,
            enum: ['MenClothing', 'WomenClothing'],
            required: true
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}));

const Cart = mongoose.model('Cart');

// Create an order from the user's cart.
router.post('/checkout', async (req, res) => {
    try {
        const { userId } = req.body;
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart || !cart.items.length) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        const items = cart.items.map(item => ({
            productId: item.productId._id,
            productType: item.productType,
            name: item.productId.name,
            image: item.productId.image,
            price: item.productId.price,
            quantity: item.quantity
        }));

        const totalPrice = items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        const order = await Order.create({
            userId,
            items,
            totalPrice
        });

        cart.items = [];
        await cart.save();

        res.status(201).json({ order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all orders.
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update order status.
router.put('/:id', async (req, res) => {
    try {
        const allowedStatuses = [
            'Pending',
            'Processing',
            'Shipped',
            'Delivered',
            'Cancelled'
        ];

        if (!allowedStatuses.includes(req.body.status)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an order.
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
