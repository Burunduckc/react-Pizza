import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    text: ''
}

const inputVal = createSlice({
    name: 'InputValue',
    initialState,
    reducers:{
        changeInput (state, action) {
            state.text = action.payload
            console.log(state.text)
        }
    }
})
export default inputVal.reducer
export const {changeInput} = inputVal.actions