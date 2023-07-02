import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

type sortProp = {
    name: string,
    sortProperty: 'rating' | 'title' | 'price' | '-price'
}

type initialStateType = {
    searchValue: string,
    categoryId: number,
    currentPage: number,
    sortType: sortProp
}

const initialState: initialStateType = {
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
        setCategoryId(state, action: PayloadAction<number>){
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>){
             state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<sortProp>){
            state.sortType = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>){
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<any>){
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

export const getFilterListSelect = (state: RootState) => state.filters.sortType
export const getFilterSelect = (state: RootState) => state.filters
export const getFilterPropertySelect = (state: RootState)=>state.filters.sortType.sortProperty
export default filterSlice.reducer

export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions