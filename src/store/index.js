import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-redux';
import expenseReducer from "./expenseReducer";
import themeReducer from "./themeReducer";


const store = configureStore({
    reducer: {
        auth: authReducer,
        expense: expenseReducer,
        theme: themeReducer
    }
})


export default store;