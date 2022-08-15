import mongoose from "mongoose"; 
import dotenv from "dotenv"; 
import colors from "colors"; 
import users from "./constants/users.js"; 
import parrillas from "./constants/parrillas.js"; 
import User from "./models/User.js"; 
import Pin from "./models/Pin.js"; 
import connectDB from "./config/db.js"; 

dotenv.config(); 

connectDB(); 

const importData = async () => {
    try {
        await User.deleteMany();
        await Pin.deleteMany();
        
        const createdUsers = await User.insertMany(users); // insert users data into db
        const samplePins = parrillas.map(parrilla => {
            return {
                ...parrilla, 
                createdUsers, 
            }; 
        }); 

        await Pin.insertMany(samplePins); 
        console.log("Data imported".green.inverse); 
        process.exit(); 
    } catch (error) {
        console.error(`${error}.red.inverse`); 
        process.exit(1)
    };
}; 

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Pin.deleteMany();

        console.log("Data destroyed".red.inverse); 
        process.exit(); 
    } catch (error) {
        console.error(`${error}`.red.inverse); 
        process.exit(1)
    };
}; 

if(process.argv[2] === "-d") {
    destroyData(); 
} else {
    importData(); 
}