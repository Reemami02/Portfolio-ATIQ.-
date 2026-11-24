
const mongoose = require('mongoose');
const router = require('express').Router();


// Contact Information Schema
const contactInfoSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    facebookLink: {
            type: String
        },

    instagramLink: {
            type: String
        },

    twitterLink: {
            type: String
        }


});


// Contact Message Schema
const contactMessageSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    message: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});


const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);


// Endpoints 

//--------------------------** contact information **----------------------------------------

router.post('/add', async (req, res) => {
    try {

        const { email, phone, address, facebookLink,instagramLink,twitterLink } = req.body;

        const myContact = new ContactInfo({
            email, phone, address, facebookLink,instagramLink,twitterLink
        });
        const newContact = await myContact.save();

        res.status(201).json({newContact});

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
});


router.get('/', async (req, res) => {
    try {

        const contactInfo = await ContactInfo.findOne();

        if (!contactInfo) {
            return res.status(404).json({
                message: 'Contact information not found'
            });
        }

        res.status(200).json({contactInfo});

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});


router.put('/', async (req, res) => {
    try {

        const { email, phone, address, facebookLink,instagramLink,twitterLink } = req.body;


        const updatedInfo = await ContactInfo.findOneAndUpdate({},
            {
                email,
                phone,
                address,
                facebookLink,
                instagramLink,
                twitterLink 
            },{new: true,runValidators: true,upsert:true,setDefaultsOnInsert:true}
        );

        res.status(200).json({updatedInfo});

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
});

//---------------------------------------------** messages**--------------------------------------

router.post('/message', async (req, res) => {
    try {

        const { name, email, message } = req.body;

        // Create New Message
        const newMessage = new ContactMessage({
            name,
            email,
            message
        });
        const savedMessage = await newMessage.save();

        res.status(201).json({savedMessage});

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
});



router.get('/message', async (req, res) => {
    try {

        const allMessages = await ContactMessage.find()
            .sort({ createdAt: -1 });

        res.status(200).json({allMessages});

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});


router.delete('/message/:id', async (req, res) => {
    try {
        const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);
        if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
        res.status(200).json({ deletedMessage });
    } catch (error) { res.status(400).json({ error: error.message }); }
});

module.exports = router;
