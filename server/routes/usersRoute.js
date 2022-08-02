import express from "express"; 
const router = express.Router(); 
import { registerUser, loginUser, updateUser } from "../controllers/userController.js"; 

// CRUD -  POST / PUT
router.post("/register", registerUser); 
router.post("/login", loginUser); 
router.put("/:id", updateUser); 

export default router