import {configureStore} from "@reduxjs/toolkit";
import stateManagement from './Slices/stateSlice'
import inputVal from './Slices/filterSlice'
import allstatesSlice from "./Slices/allstatesSlice";
export default configureStore({
    reducer:{
        stateManagement: stateManagement,
        InputValue: inputVal,
        states: allstatesSlice
    }
})