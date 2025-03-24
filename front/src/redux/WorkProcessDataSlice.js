import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data : []
}

const WorkProcessDataSlice = createSlice({
    name: "WorkProcessDataSlice",

    initialState,
    reducers : {
        resetState : (state) =>{
            
        },
        handleFetchData: (state, action) => {
            state.data = action.payload
        }
    }
})

export default WorkProcessDataSlice.reducer;
export const {resetState, handleFetchData} = WorkProcessDataSlice.actions;