const authController = require('express').Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require("../middlewares/verifytoken")

//register
authController.post('/register', async(req, res) => {
    try{
        const isExisting = await User.findOne({email: req.body.email})
        if(isExisting){
            throw new Error("Already Such an Email registered")
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = await User.create({...req.body, password: hashedPassword})

        const {password, ...others} = newUser._doc
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '4h'})

        return res.status(201).json({others, token})
    } catch (error){
        return res.status(500).json(error.message)
    }
})


//login
authController.post('/login', async(req, res) => {
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user){
            throw new Error("Wrong Credentials")
        }

        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if(!comparePass){
            throw new Error("Wrong Credentials")
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '4h'})
        const {password, ...others} = user._doc

        res.status(200).json({others, token})

    } catch (error) {
        res.status(500).json(error.message)
    }
})


authController.get('/getAll', async(req, res) => {
    try{
        const allUserData = await User.find({})

        return res.status(200).json(allUserData)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


authController.get('/find/:id', async(req, res) => {
    try{
        const userData = await User.findById(req.params.id)
      
        if(!userData){
            throw new Error("No such user with this id")
        }
        return res.status(200).json(userData)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


authController.put('/:id', verifyToken, async (req, res) => {
    try {
        const updateUserData = await User.findById(req.params.id);

        if (!updateUserData) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (updateUserData.id !== req.user.id.toString()) {
            throw new Error("You are not allowed to update other user data");
        }

        // Ensure dateofbirth is correctly formatted before updating
        if (req.body.dateofbirth) {
            req.body.dateofbirth = new Date(req.body.dateofbirth); // Convert to Date object
        }

        const updatedProperty = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        return res.status(200).json(updatedProperty);
    } catch (error) {
        if (error.name === 'CastError' && error.path === 'dateofbirth') {
            return res.status(400).json({ error: 'Invalid date format for dateofbirth' });
        }
        return res.status(500).json({ error: error.message });
    }
});



//delete user
authController.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deleteUserData = await User.findById(req.params.id);

        if (!deleteUserData) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (deleteUserData.id !== req.user.id.toString()) {
            throw new Error("You are not allowed to delete other user's data");
        }

        await User.findByIdAndDelete(req.params.id); // Use findByIdAndDelete to remove the document

        return res.status(200).json({ msg: 'Successfully deleted user' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = authController
