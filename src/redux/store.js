import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./Slices/filterSlice";
export default configureStore({
    reducer:{
    filters: filterSlice
    }
})