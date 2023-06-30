import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus', async (params, thunkAPI) => {
        const {sortBy, order, search, limit, categoryId, currentPage} = params
        const {data} = await axios.get(`https://6461fbf8491f9402f4af5cab.mockapi.io/Pizza-items?page=${currentPage}&${limit}${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortBy}&order=${order}${search}`)

        // if (data.length){
        //     return thunkAPI.rejectWithValue('Нету пицц')
        // }
        //
        // return thunkAPI.fulfillWithValue(data)
        return data
    }
)

const initialState = {
    items: [],
    isLoading: 'loading' // loading || success || error
}



const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers:{
        setItems(state, action){
        state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.isLoading = 'loading'
            state.items = []
        }, // Pending -- ожидание.
        [fetchPizzas.fulfilled]: (state, action) => {
            state.isLoading = 'success'
            state.items = action.payload
        }, // fulfilled -- успешный запрос
        [fetchPizzas.rejected]: (state, action) => {
            console.log(action)
             state.isLoading = 'error'
            state.items = []
        } // rejected -- ошибка запроса (не верная ссылка или какие то сбои пошли)
    }
});

export const pizzaSelect = state => state.pizzas

export const {} = pizzasSlice.actions
export default pizzasSlice.reducer