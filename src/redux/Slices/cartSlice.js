import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addProduct(state, action) {
        //     state.items.push(action.payload)
        //     state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0)
        // },
        addProduct(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            findItem ? findItem.count++ : state.items.push({
                ...action.payload,
                count: 1
            })
            state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
        },
        minusItem(state, action){
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem && findItem.count >= 2){
                findItem.count--
            }
        },
        removeProduct(state, action) {
        state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearProduct(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const getCartSelect = (state) => state.cart
export const getCartItems =(id)=> state => state.cart.items.find(obj=> obj.id ===id)

export const {addProduct,removeProduct, clearProduct, minusItem} = cartSlice.actions

export default cartSlice.reducer
