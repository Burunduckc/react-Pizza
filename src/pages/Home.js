//React
import React from "react";
import {useNavigate} from 'react-router-dom'
//QS
import qs from 'qs'
//Axios
import axios from "axios";
//Redux
import {setCategoryId, setCurrentPage, setFilters} from "../redux/Slices/filterSlice";
    import {useDispatch, useSelector} from "react-redux";
//UI
import {Catalog} from "../components/Header/Catalog";
import {arrName, Sort} from "../components/Header/Sort";
import {PizzaSkeleton} from "../components/PizzasItems/SkeletonPizza";
import {PizzaItem} from "../components/PizzasItems/PizzaItem";
import {Pagination} from "../components/pagination";
import {SearchContext} from "../App";
//Component
export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categoryId = useSelector((state)=> state.filters.categoryId);
    const sortType = useSelector(state=>state.filters.sortType.sortProperty);
    console.log(sortType)
    const currentPage = useSelector(state => state.filters.currentPage);
    console.log('redux state', categoryId);




    const {inputValue} = React.useContext(SearchContext)
    const [pizzas, setPizzas] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = number =>{
    dispatch(setCurrentPage(number))
    }

    React.useEffect(() => {
        if (window.location.search){
            const params = qs.parse(window.location.search.substring(1))
            const sort = arrName.find(obj => obj.sortProperty === params.sortProperty)
            console.log(sort)
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
        }
    }, [])

    React.useEffect(()=>{
        setIsLoading(true)

        const sortBy = sortType.replace('-', '')
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const search = inputValue ? `&search=${inputValue}` : '';
        const limit = `limit=4&`
        // fetch(`https://6461fbf8491f9402f4af5cab.mockapi.io/Pizza-items?page=${currentPage}&${limit}${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortBy}&order=${order}${search}`)
        //     .then(res => res.json())
        //     .then(arr=>{
        //         setPizzas(arr)
        //         setIsLoading(false)
        //     }) ----- Старый запрос на сервер
        axios
            .get(
                `https://6461fbf8491f9402f4af5cab.mockapi.io/Pizza-items?page=${currentPage}&${limit}${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortBy}&order=${order}${search}`
            ).then(response=>{
             setPizzas(response.data)
            setIsLoading(false)
        })
        //↑
        //новый запрос на сервер через axios

        window.scrollTo(0,0)
    }, [categoryId, sortType, inputValue, currentPage]);

    React.useEffect(() => {
        const queryString  = qs.stringify({
            sortProperty: sortType,
            categoryId,
            currentPage
        })
        navigate(`?${queryString}`)
    }, [categoryId, sortType, currentPage])

    const pizzasItems = pizzas.map((obj) => <PizzaItem key={obj.id} {...obj} src={obj.imageUrl}/>)
    const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index}/>)
    return (
        <div className='container'>
            <div className="content__top">
                <Catalog value={categoryId} onClickCategory={onClickCategory} />
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoading ?  skeletons: pizzasItems}</div>
            <Pagination value={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

/*
Фильтрация для статичного массива
.filter(obj=>{
        if(obj.title.toLowerCase().includes(prop.value.toLowerCase().trim())){
            return true;
        }
        return false
    })
*/
