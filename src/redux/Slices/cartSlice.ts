import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {getCartFromLocalStorage} from "../../utils/getCartFromLocalStorage";
import {calcTotalPrice} from "../../utils/calcTotalPrice";

export type CartItemType = {
    id: number,
    title: string,
    price: number,
    imageUrl: string,
    type: string,
    size:  number,
    count: number,
}

interface CartSliceState {
    totalPrice: number,
    items: CartItemType[]
}



const initialState: CartSliceState = {
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
        addProduct(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            findItem ? findItem.count++ : state.items.push({
                ...action.payload,
                count: 1
            })
            // @ts-ignore
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<number>){
            const findItem: any = state.items.find(obj => obj.id === action.payload)
            if (findItem){
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

export const getCartSelect = (state: RootState) => state.cart
export const getCartItems =(id: number)=> (state: RootState) => state.cart.items.find((obj)=> obj.id ===id)

export const {addProduct,removeProduct, clearProduct, minusItem} = cartSlice.actions

export default cartSlice.reducer
