import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {isLoggedIn: false, token:null};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers:{
        login(state, action){
            state.isLoggedin = true;
            state.token = action.payloadload
        },
        logout(state, action){
            state.isLoggedIn = true;
            state.token = action.payloadload
        }
    }
})

export const authActions = authSlice.action;
export default authSlice;