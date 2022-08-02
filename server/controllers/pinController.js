import asyncHandler from "express-async-handler"; 
import Pin from "../models/Pin.js"; 

// @description: Create Pin 
// @route: POST 
const createPin = asyncHandler(async (req, res) => {
    // const newPin = new Pin(req.body); 
    // can destructure req.body object 
    const { username, title, description, rating, latitude, longitude } = req.body; 
    // error check 
    if(!username || !title || !description || !rating || !latitude || !longitude) {
        res.status(400); 
        throw new Error("Please add all fields"); 
    }; 
    // check if PIN exists 
    const pinExists = await Pin.findOne({ title }); 
    if(pinExists) {
        res.status(400); 
        throw new Error("Pin already exists"); 
    }; 
    // create pin with req.body 
    const pin = await Pin.create(req.body); 
    if(pin) {
        res.status(201).json(pin); 
    } else {
        res.status(400); 
        throw new Error("Invalid Pin"); 
    }; 
}); 

// @description: Get All Pins
// @route: GET 
const getAllPins = asyncHandler(async (req, res) => {
    const pins = await Pin.find(); 
    // check if no pins 
    if(!pins) {
        res.status(400); 
        throw new Error("Pins not found"); 
    }; 
    res.status(200).json(pins); 
}); 

// export all 
export {
    createPin, 
    getAllPins, 
}