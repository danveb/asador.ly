import axios from "axios"; 

// Production 
// const API_URL = "/api/users/"; 

// Deployment 
const API_URL = process.env.REACT_APP_API_URL; 
const REGISTER_URL = `${API_URL}/api/users/register`; 
const LOGIN_URL = `${API_URL}/api/users/login`;

// Register user 
const register = async (userData) => {
    const response = await axios.post(REGISTER_URL, userData); 
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data)); 
    }; 
    return response.data; 
}; 

// Logout user 
const logout = async () => {
    localStorage.removeItem("user"); 
}; 

// Login user 
const login = async (userData) => {
    const response = await axios.post(LOGIN_URL, userData); 
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data)); 
    }; 
    return response.data; 
}; 

const authService = {
    register, 
    logout, 
    login
}; 

export default authService