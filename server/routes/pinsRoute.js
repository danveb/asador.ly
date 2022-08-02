import express from "express"; 
const router = express.Router(); 
import { createPin, getAllPins } from "../controllers/pinController.js"; 

// CRUD - POST 
router.post("/", createPin); 

// CRUD - GET
router.get("/", getAllPins); 

export default router