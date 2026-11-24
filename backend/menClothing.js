
const mongoose = require('mongoose');
const router = require('express').Router();

// Schema
const menClothingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
 
    category: {
        type: String
    },
    image: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: 'men'
    }
}, { timestamps: true });

const MenClothing = mongoose.model('MenClothing', menClothingSchema);


// Add Clothing
router.post('/', async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;

        const myClothing = new MenClothing({
            name,
            description,
            price,
            category,
            image,
            stock
        });

        const newClothing = await myClothing.save();

        res.status(201).json({ newClothing });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get All Clothing
router.get('/', async (req, res) => {
    try {
        const allClothing = await MenClothing.find().sort({ createdAt: -1 });

        res.status(200).json({ allClothing });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get Clothing By ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const myClothing = await MenClothing.findById(id);

        if (!myClothing) {
            return res.status(404).json({
                message: 'Clothing not found'
            });
        }

        res.status(200).json({ myClothing });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update Clothing
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const { name, description, price, category, image, stock } = req.body;

        const updatedClothing = await MenClothing.findByIdAndUpdate(
            id,
            { name, description, price, category, image, stock },
            { new: true, runValidators: true }
        );

        if (!updatedClothing) {
            return res.status(404).json({
                message: 'Clothing not found'
            });
        }

        res.status(200).json({ updatedClothing });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Delete Clothing
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const myClothing = await MenClothing.findByIdAndDelete(id);

        if (!myClothing) {
            return res.status(404).json({
                message: 'Clothing not found'
            });
        }

        res.status(200).json({ myClothing });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
