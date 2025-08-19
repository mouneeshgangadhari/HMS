const user = require('../models/userModel');

// Function to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await user.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
    }
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const userData = await user.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
}
const createUser = async (req, res) => {
    const newUser = new user(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}
const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const updatedUser = await user.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {       
        res.status(500).json({ message: 'Error updating user', error });
    }
}
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await user.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}   
module.exports = {
    getAllUsers,
    getUserById,    
    createUser,
    updateUser,
    deleteUser
};    