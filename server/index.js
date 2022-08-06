import express from "express"; 
import colors from "colors"; 
import dotenv from "dotenv/config"; 
import connectDB from "./config/db.js"; 
import pinsRoute from "./routes/pinsRoute.js"; 
import usersRoute from "./routes/usersRoute.js"; 
const port = process.env.PORT || 8800; 
import errorHandler from './middleware/errorMiddleware.js'; 

connectDB(); 

const app = express(); 

// Middleware
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: false })); 
app.use(errorHandler); 

// For Frontend (running production)
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build"))); 
    app.get("*", (req, res) => [
        res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"))
    ]); 
} else {
    app.get("/", (req, res) => {
        res.send("Please set to production!"); 
    }); 
}; 

// Sample Request on localhost:8800 
app.get("/", (req, res) => {
    res.send("Hello World!"); 
}); 

// Routes 
app.use("/api/pins", pinsRoute); 
app.use("/api/users", usersRoute); 

app.listen(port, () => {
    console.log(`Server started on port ${port}`); 
}); 