import mongoose from "mongoose"; 

const PinSchema = mongoose.Schema({
    username: {
        type: String, 
        required: true, 
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
        type: Number, 
        required: true, 
        min: 1, 
        max: 5, 
    }, 
    cost: {
        type: Number, 
        required: true, 
        min: 1, 
        max: 5, 
    }, 
    // GeoJSON (as per docs) 
    location: {
        type: {
            type: String, 
            enum: ["Point"], 
        }, 
        coordinates: {
            type: [Number], // longitude, latitude (as per docs) 
            index: "2dsphere"
        },
    }, 
}, {
    timestamps: true, 
}); 

export default mongoose.model("Pin", PinSchema)