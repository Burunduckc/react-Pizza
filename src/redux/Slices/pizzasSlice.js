import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus', async (params) => {
        const {sortBy,
            order,
            search,
            limit,
            categoryId,
            currentPage} = params
        const {data} = await axios.get(`https://6461fbf8491f9402f4af5cab.mockapi.io/Pizza-items?page=${currentPage}&${limit}${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState = {
    items: [],
    isLoading: 'loading'
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
        [fetchPizzas.fulfilled]: (state, action) => {
            state.isLoading = 'success'
            state.items = action.payload
        },
        [fetchPizzas.pending]: (state) => {
            state.isLoading = 'loading'
            state.items = []
        },
        [fetchPizzas.rejected]: (state) => {
             state.isLoading = 'error'
            state.items = []
        }
    }
});

export const {} = pizzasSlice.actions
export default pizzasSlice.reducer