import { createSlice } from "@reduxjs/toolkit";

const guideSlice = createSlice({
    name:'guide',
    initialState:{
        guide:null
    },
    reducers:{
        getGuide: (state, action ) => {
            state.guide = action.payload        
          },
    }
})

export const { getGuide } = guideSlice.actions;
export default guideSlice.reducer;