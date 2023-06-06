import {createSlice} from "@reduxjs/toolkit";

const initialState={
    name: '',
    value: 0
}

const allStatesSlice = createSlice({
    name: "states",
    initialState,
    reducers:{
        changeValue(state){
            if (state.value <= 9){
                state.value += 1
                console.log(state.value)
            }
        },
        changeValueDicrement(state){
            if (state.value > 0){
                state.value -= 1

            }
        }
        ,
        changeName(state, action){
            state.name = action.payload
            console.log(state.name)
        }
    }
})
export default allStatesSlice.reducer
export const {changeName, changeValue, changeValueDicrement} = allStatesSlice.actions