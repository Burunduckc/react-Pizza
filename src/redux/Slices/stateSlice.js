import {createSlice} from "@reduxjs/toolkit";

const initialState={
    stateMan:false
}

const stateManagement = createSlice({
    name:'stateManagement',
    initialState,
    reducers:{
        switchBool(state, action){
            console.log(action)
            console.log(state)
            state.stateMan = !state.stateMan
            console.log(state.stateMan)
        }
    }
})
export default stateManagement.reducer
export const {switchBool} = stateManagement.actions