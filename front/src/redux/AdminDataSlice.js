import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    homeBanner : {},
    counter : {},
    whatWeDo: []
}


const AdminDataSlice = createSlice({
    name: "adminDataSlice",

    initialState,
    reducers : {
        resetState : (state) =>{
            
        },
        handlePostCounter : (state, action) =>{
            state.counter = action.payload
        },
        handlePostBanner : (state, action) =>{
            const {banner} = action.payload
            state.homeBanner.banner = banner
        },
        handlePostWhatWeDo : (state, action) =>{ 
            state.whatWeDo = action.payload
        },
    }
})




export default AdminDataSlice.reducer;
export const {resetState, handlePostCounter, handlePostBanner, handlePostWhatWeDo} = AdminDataSlice.actions;