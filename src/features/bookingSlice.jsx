import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name:'book',
    initialState:{
        book:null
    },
    reducers:{
        getBook: (state, action ) => {
            state.book = action.payload        
          },
    }
})

export const { getBook } = bookingSlice.actions;
export default bookingSlice.reducer;