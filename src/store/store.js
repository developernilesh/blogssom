import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
    }
})

console.log("Redux store");


export default store;