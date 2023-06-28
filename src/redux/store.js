import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./Slices/filterSlice";
import cart from './Slices/cartSlice'
import pizzas from "./Slices/pizzasSlice";
export default configureStore({
    reducer:{
    filters: filterSlice,
    cart,
    pizzas
    }
})