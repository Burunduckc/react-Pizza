import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sortType:{
        name: 'Популярности',
        sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers:{
        setCategoryId(state, action){
            state.categoryId = action.payload;
        },
        setSort(state, action){
            state.sortType = action.payload;
        },
        setCurrentPage(state, action){
            state.currentPage = action.payload;
        },
        setFilters(state, action){
            state.currentPage = Number(action.payload.currentPage);
            state.sortType = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
        }
    }
})

export default filterSlice.reducer

export const {setCategoryId, setSort, setCurrentPage, setFilters} = filterSlice.actions