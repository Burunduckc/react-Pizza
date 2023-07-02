import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

type FetchPizzasCarts = {
    sortBy: string,
    order: string,
    search: string,
    limit: string,
    categoryId: number,
    currentPage: number
}

type Pizza = {
    id: number,
    title: string,
    price: number,
    imageUrl: string,
    type: number[],
    size:  number[],
    count: number,
}
export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasCarts>(
    'pizza/fetchPizzasStatus', async (params) => {
        const {sortBy, order, search, limit, categoryId, currentPage} = params
        const {data} = await axios.get<Pizza[]>(
            `https://6461fbf8491f9402f4af5cab.mockapi.io/Pizza-items?page=${currentPage}&${limit}${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data;
    }
)

enum PizzaIsLoading {
    PENDING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: Pizza[];
    isLoading: PizzaIsLoading
}

const initialState: PizzaSliceState = {
    items: [],
    isLoading: PizzaIsLoading.PENDING // loading || success || error
}



const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers:{
        setItems(state, action: PayloadAction<Pizza[]>){
        state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.isLoading = PizzaIsLoading.PENDING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.isLoading = PizzaIsLoading.SUCCESS
            state.items = action.payload
        })
        builder.addCase(fetchPizzas.rejected, (state)=>{
            state.isLoading = PizzaIsLoading.ERROR
            state.items = []
        })
    }
    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         state.isLoading = 'loading'
    //         state.items = []
    //     }, // Pending -- ожидание.
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.isLoading = 'success'
    //         state.items = action.payload
    //     }, // fulfilled -- успешный запрос
    //     [fetchPizzas.rejected]: (state, action) => {
    //         console.log(action)
    //          state.isLoading = 'error'
    //         state.items = []
    //     } // rejected -- ошибка запроса (не верная ссылка или какие то сбои пошли)
    // }
});

export const pizzaSelect = (state: RootState) => state.pizzas
export default pizzasSlice.reducer