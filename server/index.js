import express from "express"; 
import colors from "colors"; 
import dotenv from "dotenv/config"; 
import connectDB from "./config/db.js"; 
import pinsRoute from "./routes/pinsRoute.js"; 
import usersRoute from "./routes/usersRoute.js"; 
const port = process.env.PORT || 8800; 
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; 
import cors from "cors"; 

connectDB(); 

const app = express(); 

// Middleware
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: false })); 

// CORS 
app.use(cors()); 

// Routes 
app.use("/api/pins", pinsRoute); 
app.use("/api/users", usersRoute); 

// Error Middleware
app.use(notFound); 
app.use(errorHandler); 

// Sample Request on localhost:8800 
app.get("/", (req, res) => {
    res.send("Hello World!"); 
}); 

app.listen(port, () => {
    console.log(`Server started on port ${port}`); 
}); 