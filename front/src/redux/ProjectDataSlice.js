import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data : []
}

const ProjectDataSlice = createSlice({
    name: "projectDataSlice",

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
        }
    }
})

export default ProjectDataSlice.reducer;
export const {resetState, handleFetchData, handlePostData, handleRemoveData, handleModifyData} = ProjectDataSlice.actions;