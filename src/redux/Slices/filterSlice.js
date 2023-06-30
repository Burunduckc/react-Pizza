import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
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
        setSearchValue(state, action){
             state.searchValue = action.payload
        },
        setSort(state, action){
            state.sortType = action.payload;
        },
        setCurrentPage(state, action){
            state.currentPage = action.payload;
        },
        setFilters(state, action){
            if (Object.keys(action.payload).length){
                state.currentPage = Number(action.payload.currentPage);
                state.sortType = action.payload.sort;
                state.categoryId = Number(action.payload.categoryId);
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sortType = {
                    name: 'Популярности',
                        sortProperty: 'rating'
                }
            }
        }
    }
})

export const getFilterListSelect = state => state.filters.sortType
export const getFilterSelect = state => state.filters
export const getFilterPropertySelect = state=>state.filters.sortType.sortProperty
export default filterSlice.reducer

export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions