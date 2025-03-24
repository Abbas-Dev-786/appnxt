import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data : []
}

const SliderDataSlice = createSlice({
    name: "SliderDataSlice",

    initialState,
    reducers : {
        resetState : (state) =>{
            
        },
        handleFetchData: (state, action) => {
            state.data = action.payload
        }
    }
})

export default SliderDataSlice.reducer;
export const {resetState, handleFetchData} = SliderDataSlice.actions;