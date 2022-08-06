import axios from "axios"; 

const API_URL = "/api/pins/"; 

// Create pin
const createPin = async (pinData) => {
    const response = await axios.post(API_URL, pinData); 
    return response.data; 
}; 

// Get Pins
const getPins = async () => {
    const response = await axios.get(API_URL); 
    return response.data; 
}; 

const pinService = {
    createPin, 
    getPins, 
}

export default pinService