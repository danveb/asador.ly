import asyncHandler from "express-async-handler"; 
import User from "../models/User.js";
import Pin from "../models/User.js"; 

// @description: Register User 
// @route: POST 
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body; 
    // error check 
    if(!username || !email || !password) {
        res.status(400); 
        throw new Error("Please add all fields"); 
    }; 
    // check if user already exists 
    const userExists = await User.findOne({ username }); 
    if(userExists) {
        res.status(400); 
        throw new Error("User already exists"); 
    }; 
    // register the user
    const user = await User.create(req.body); 
    if(user) {
        res.status(201).json(user); 
    } else {
        res.status(400); 
        throw new Error("Invalid User"); 
    }; 
}); 

// export all 
export {
    registerUser, 
}