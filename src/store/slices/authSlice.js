import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentuser: null,
    isAuthenticated: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action){
            state.currentuser = action.payload;
            state.isAuthenticated = true;
        },
        logout(state){
            state.currentuser = null;
            state.isAuthenticated = false;
        },
        updateUser(state, action){
            state.currentuser = { ...state.currentuser, ...action.payload}
        }
    }
})

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;