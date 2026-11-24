const mongoose = require('mongoose');
const router = require('express').Router();

const aboutSchema = new mongoose.Schema({
    hTitle: { type: String,
         default: 'Style That Speaks For You' },
    hDescription: { type: String,
         default: '' },
    storyTitle: { type: String, default: 'Fashion For Everyone' },
    storyImage: { type: String,
         default: '' },
    storyParagraphs: { type: [String], 
        default: [] },
    mTitle: { type: String, 
        default: 'Our Mission' },
    mDescription: { type: String,
         default: '' },
    vTitle: { type: String,
         default: 'Our Vision' },
    vDescription: { type: String, 
        default: '' },
    features: [{
        icon: String,
        title: String,
        description: String
    }],
    closingTitle: { type: String, default: 'Be Yourself. Wear Your Style.' },
    closingDescription: { type: String, default: '' }
});

const About = mongoose.model('About', aboutSchema);

// Get 
router.get('/', async (req, res) => {
    try {
        let about = await About.findOne();
        if (!about) {
            about = await About.create({
                hDescription: "We believe fashion is more than clothing. It's a way to express your personality, confidence and individuality.",
                storyImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900',
                storyParagraphs: [
                    'Our store was created with a simple idea: to make fashion accessible, stylish and enjoyable for everyone.',
                    'We carefully select our collections to bring you modern designs, quality products and comfortable styles for every occasion.'
                ],
                mDescription: 'To provide high-quality fashion products with a comfortable and enjoyable shopping experience for every customer.',
                vDescription: 'To become a trusted fashion destination where everyone can find their own style and feel confident.',
                features: [
                    { icon: '✦', title: 'Quality Products', description: 'We care about quality and details.' },
                    { icon: '♡', title: 'Modern Styles', description: 'Discover the latest fashion trends.' },
                    { icon: '✓', title: 'Easy Shopping', description: 'Enjoy a simple and smooth experience.' },
                    { icon: '★', title: 'Customer Satisfaction', description: 'Your happiness is always our priority.' }
                ],
                closingDescription: 'Discover your favorite pieces and make every outfit a statement.'
            });
        }
        res.status(200).json({ about });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add 
router.post('/', async (req, res) => {
    try {
        const about = await About.create(req.body);
        res.status(201).json({ about });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update 
router.put('/', async (req, res) => {
    try {
        const about = await About.findOneAndUpdate({}, req.body, {
            new: true,
            runValidators: true,
            upsert: true,
            setDefaultsOnInsert: true
        });
        res.status(200).json({ about });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete About content
router.delete('/', async (req, res) => {
    try {
        const about = await About.findOneAndDelete({});
        if (!about) return res.status(404).json({ message: 'About content not found' });
        res.status(200).json({ about });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
