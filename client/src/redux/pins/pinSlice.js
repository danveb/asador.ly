import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import pinService from "./pinService"; 

const initialState = {
    pins: [], 
    isError: false, 
    isSuccess: false, 
    isLoading: false, 
    message: "", 
}; 

// AsyncThunk functions 
// - Create pin
export const createPin = createAsyncThunk("/pins", async (pinData, thunkAPI) => {
    try {
        return await pinService.createPin(pinData); 
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString(); 
        return thunkAPI.rejectWithValue(message); 
    }; 
}); 

// - Get Pins
export const getPins = createAsyncThunk("/pins/", async (_, thunkAPI) => {
    try {
        return await pinService.getPins(); 
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString(); 
        return thunkAPI.rejectWithValue(message); 
    }; 
}); 

// export slice 
export const pinSlice = createSlice({
    name: "pins", 
    initialState, 
    reducers: {
        reset: (state) => {
            state.isLoading = false; 
            state.isSuccess = false; 
            state.isError = false; 
            state.message = ""; 
        }, 
    }, 
    extraReducers: (builder) => {
        builder
            // createPin
            .addCase(createPin.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(createPin.fulfilled, (state, action) => {
                state.isLoading = false; 
                state.isSuccess = true; 
                state.pins.push(action.payload); 
            })
            .addCase(createPin.rejected, (state, action) => {
                state.isLoading = false; 
                state.isError = true; 
                state.message = action.payload; 
            })
            // getPins
            .addCase(getPins.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(getPins.fulfilled, (state, action) => {
                state.isLoading = false; 
                state.isSuccess = true; 
                state.pins = action.payload; 
            })
            .addCase(getPins.rejected, (state, action) => {
                state.isLoading = false; 
                state.isError = true; 
                state.message = action.payload; 
            })
    }
})

export const { reset } = pinSlice.actions 
export default pinSlice.reducer