import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./Slices/filterSlice";
import cart from './Slices/cartSlice'
import pizzas from "./Slices/pizzasSlice";
import {useDispatch} from "react-redux";
export const store = configureStore({
    reducer:{
    filters: filterSlice,
    cart,
    pizzas
    }
})
export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()