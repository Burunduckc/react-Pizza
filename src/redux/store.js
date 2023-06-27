import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./Slices/filterSlice";
import cart from './Slices/cartSlice'
export default configureStore({
    reducer:{
    filters: filterSlice,
    cart
    }
})