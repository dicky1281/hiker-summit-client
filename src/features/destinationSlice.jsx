import { createAsyncThunk, createSlice,createEntityAdapter } from "@reduxjs/toolkit";
import { publicAxiosInstance } from "../Instance/axiosInstance";

export const getDestinations = createAsyncThunk("destination/getDestinations", async()=>{
    const response = await publicAxiosInstance.get('/api/v1/destinations');
    return response.data.result.docs
})

const destinationEntity = createEntityAdapter({
    selectId: ( destinations ) => destinations._id
})

export const destinationSlice = createSlice({
    name:"destinations",
    initialState:destinationEntity.getInitialState(),
    extraReducers:{
        [getDestinations.fulfilled]: (state,action) => {
            destinationEntity.setAll(state,action.payload)
        }
    }
    
})

export const destinationSelectors = destinationEntity.getSelectors(state => state.destinations)
export default destinationSlice.reducer;