import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState :{
        user: null
    },
    reducers:{
        login: (state, action ) => {
            state.user = action.payload        
          },
        logout: (state) => {
            state.user = null 
          },
        name: (state, action) =>{
            state.user.first_name = action.payload
          },
        lastName:(state, action)=>{
            state.user.last_name = action.payload
          },
        phone:(state, action)=>{
            state.user.phone_number = action.payload
          },
        username:(state, action)=>{
            state.user.username = action.payload
          },
          wishlist: (state, action) =>{
            state.user.destination_wishlist.push(action.payload)
          },
        verify:(state, action)=>{
          state.user.verified = action.payload
        },
        updateProfilePicture:(state, action) => {
          state.user.image_assets.assets_key = action.payload
        }
    }
})
export const {login,logout,name, lastName, phone, username,wishlist, verify, updateProfilePicture} = userSlice.actions;
export default userSlice.reducer;

