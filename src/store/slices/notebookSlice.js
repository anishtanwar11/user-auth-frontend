import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notebooks: null
}

const notebookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        getNotebooks(state, action){
            state.notebooks = action.payload 
        },
        removeNotebooks(state){
            state.notebooks = null
        }
    }
})

export const { getNotebooks, removeNotebooks } = notebookSlice.actions;
export default notebookSlice.reducer;