import axios from "axios";

// Production
// const API_URL = "/api/pins/"; 

// Deployment 
const API_URL = process.env.REACT_APP_API_URL;
const CREATE_URL = `${API_URL}/api/pins`;
const GET_URL = `${API_URL}/api/pins`;

// Create pin
const createPin = async (pinData) => {
  const response = await axios.post(CREATE_URL, pinData);
  return response.data;
};

// Get Pins
const getPins = async () => {
  const response = await axios.get(GET_URL);
  return response.data;
};

const pinService = {
  createPin,
  getPins,
}

export default pinService