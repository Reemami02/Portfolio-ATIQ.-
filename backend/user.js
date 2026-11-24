
const mongoose = require('mongoose');
const router = require('express').Router();

// Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    nationality: {
        type: String
    },
    gender: {
        type: String,
        enum: ['female', 'male']
    },
    phone:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});


const User = mongoose.model('User', userSchema);


// Register
router.post('/register', async (req, res) => {
    try {
        const { name, age, nationality, gender,phone, email, password } = req.body;

        const myuser = new User({
            name,
            age,
            nationality,
            gender,
            phone,
            email,
            password,
            role: 'user'
        });

        const newUser= await myuser.save();

        res.status(201).json({ newUser });

    } catch (error) {
        res.status(404).json({ error: error.message});
    }
});


// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const myuser = await User.findOne({
            email: email.toLowerCase(),
            password
        });

        if (!myuser) {
            return res.status(404).json({
                message: 'Invalid email or password'
            });
        }

        const safeUser = myuser.toObject();
        delete safeUser.password;
        res.status(200).json({ myuser: safeUser });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// Get all users for admin management
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ _id: -1 });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User By Email
router.get('/email/:email', async (req, res) => {
    try {
        const email=req.params.email.toLowerCase()
        const myuser = await User.findOne({email});

        if (!myuser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({myuser});

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// Update User
router.put('/:id', async (req, res) => {
    try {
        const id=req.params.id
        const{name,email,password,age,phone,nationality,gender}=req.body
        const updatedUser = await User.findByIdAndUpdate(id,{name,email,password,age,phone,nationality,gender},{new: true,runValidators: true});

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const safeUser = updatedUser.toObject();
        delete safeUser.password;
        res.status(200).json({ updatedUser: safeUser });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

//Delete user

router.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const myuser=await User.findByIdAndDelete(id)
       
        if (!myuser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
         res.status(200).json({myuser});
    }catch(error){
        res.status(400).json({error:error.message})
    }
})


module.exports = router;
