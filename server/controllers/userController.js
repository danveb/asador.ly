import asyncHandler from "express-async-handler"; 
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
import User from "../models/User.js";

// Generate JWT (token) 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"     
    }); 
}; 

// @description: Register User 
// @route: POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body; 
    // username/password length check 
    if(username.length < 3) {
        res.status(400); 
        throw new Error("Please create a new username. Minimum length is 3 characters."); 
    } else if(password.length < 4) {
        res.status(400); 
        throw new Error("Please create a new password. Minimum length is 4 characters"); 
    } else if(!username || !email || !password) {
        res.status(400); 
        throw new Error("Please add all fields"); 
    }; 
    // check if user already exists 
    const userExists = await User.findOne({ username }); 
    if(userExists) {
        res.status(400); 
        throw new Error("User already exists. Please choose a different username/email/password"); 
    }; 

    // hash password with BCRYPTJS 
    // - generate salt with 10 rounds (max 12) 
    const salt = await bcrypt.genSalt(10); 
    // - hash password 
    const hashedPassword = await bcrypt.hash(req.body.password, salt); 

    // register user with req.body 
    // - pass hashed password
    const user = await User.create({
        username, 
        email, 
        password: hashedPassword
    }); 
    if(user) {
        // res.status(201).json(user) no longer works as we
        // need make sure to get the token back
        res.status(201).json({
            _id: user.id, 
            username: user.username, 
            email: user.email, 
            password: user.password, 
            createdAt: user.createdAt, 
            updatedAt: user.updatedAt, 
            token: generateToken(user._id), // JWT here
        }); 
    } else {
        res.status(400); 
        throw new Error("Sorry, an error occured. Try again or create a new account."); 
    }; 
}); 

// @description: Login User 
// @route: POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body; 
    // check user's username but NOT found 
    const user = await User.findOne({ username }); 
    if(!user) {
        res.status(400); 
        throw new Error("Username not found. Please try again or create a new account."); 
    }

    // if correct user 
    if(user && await bcrypt.compare(password, user.password)) {
        res.json({
            _id: user.id, 
            username: user.username, 
            email: user.email, 
            createdAt: user.createdAt, 
            updatedAt: user.updatedAt, 
            token: generateToken(user._id), // JWT here
        }); 
    } else {
        res.status(400); 
        throw new Error("Invalid credentials. Please try again or create a new account."); 
    }; 
}); 

// @description: Update User 
// @route: PUT /api/users/:id 
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id); 
    if(!user) {
        res.status(400); 
        throw new Error("User not found"); 
    }; 
    // update the user 
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}); 
    // re-hash (10 rounds) user password and save to database 
    updatedUser.password = await bcrypt.hash(updatedUser.password, 10); 
    updatedUser.save(); 
    res.status(200).json(updatedUser); 
}); 

// export all 
export {
    registerUser, 
    loginUser, 
    updateUser, 
}