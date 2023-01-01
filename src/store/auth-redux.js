import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {isAuthenticated: false};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers:{
        login(state){
            state.isAuthenticated = true;
            // state.token = action.payloadload
        },
        logout(state){
            state.isAuthenticated = false;
            // state.token = action.payloadload
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;