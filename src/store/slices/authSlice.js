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
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;