import express from "express"; 
const router = express.Router(); 
import { registerUser } from "../controllers/userController.js"; 

// CRUD -  POST 
router.post("/register", registerUser); 

export default router