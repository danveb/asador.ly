import mongoose from "mongoose"; 

const PinSchema = mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        min: 3, 
        max: 20, 
        unique: true, 
    }, 
    title: {
        type: String, 
        required: true, 
        min: 3, 
    }, 
    description: {
        type: String, 
        required: true, 
        min: 3, 
    }, 
    rating: {
        type: String, 
        required: true, 
        min: 0, 
        max: 5, 
    }, 
    latitude: {
        type: Number, 
        required: true, 
    }, 
    longitude: {
        type: Number, 
        required: true, 
    }, 
}, {
    timestamps: true, 
}); 

export default mongoose.model("Pin", PinSchema)