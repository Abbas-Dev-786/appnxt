import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data : [],
    category: []
}

const ServiceDataSlice = createSlice({
    name: "ServiceDataSlice",

    initialState,
    reducers : {
        resetState : (state) =>{
            
        },
        handleFetchData: (state, action) => {
            state.data = action.payload
        },
        handlePostData: (state, action) => {
            state.data.push(action.payload)
        },
        handleRemoveData: (state, action) => {
            state.data = state.data.filter(project => project?._id !== action.payload);
        },
        handleModifyData: (state, action) => {
            const updatedProject = action.payload;
            state.data = state.data.map(project => 
                project._id === updatedProject._id ? updatedProject : project
            );
        },
        handleFetchCategory: (state, action) => {
            state.category = action.payload
        },
        handlePostCategory: (state, action) => {
            state.category.push(action.payload)
        },
        handleRemoveCategory: (state, action) => {
            state.category = state.category.filter(category => category !== action.payload);
        },
    }
})

export default ServiceDataSlice.reducer;
export const {resetState, handleFetchData, handlePostData, handleRemoveData, handleFetchCategory, handlePostCategory, handleRemoveCategory, handleModifyData} = ServiceDataSlice.actions;