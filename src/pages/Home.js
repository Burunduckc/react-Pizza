//React
import React from "react";
import {useNavigate} from 'react-router-dom'
//QS
import qs from 'qs'
//Redux
import {
    getFilterPropertySelect,
    getFilterSelect,
    setCategoryId,
    setCurrentPage,
    setFilters
} from "../redux/Slices/filterSlice";
    import {useDispatch, useSelector} from "react-redux";
import {fetchPizzas, pizzaSelect} from "../redux/Slices/pizzasSlice";
//UI
import {Catalog} from "../components/Header/Catalog";
import {arrName, Sort} from "../components/Header/Sort";
import {PizzaSkeleton} from "../components/PizzasItems/SkeletonPizza";
import {PizzaItem} from "../components/PizzasItems/PizzaItem";
import {Pagination} from "../components/pagination";
//Component
export const Home =  () => {
    //use
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //StatesRef
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    //Selectors
    const sortType = useSelector(getFilterPropertySelect)
    const {currentPage, categoryId, searchValue} = useSelector(getFilterSelect);
    const {items, isLoading} = useSelector(pizzaSelect)
    //Functions
    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = number =>{
    dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {

        const sortBy = sortType.replace('-', '')
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const search = searchValue ? `&search=${searchValue}` : '';
        const limit = `limit=4&`
        //Fetch pizzas via Redux
        dispatch(fetchPizzas({
            sortBy,
            order,
            search,
            limit,
            currentPage,
            categoryId
        }))
    }
    //Effects

    /*
    ENG: If the parameters were changed and there was a first render
    RU: Если изменили параметры и был первый рендер
    ↓
    */
    React.useEffect(() => {
        if (isMounted.current){
            const queryString  = qs.stringify({
                sortProperty: sortType,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, currentPage])

    /*
     ENG: If there was a first render, then we check the URL parameters and save in redux
     RU: Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
     ↓
     */
    React.useEffect(() => {
        if (window.location.search){
            const params = qs.parse(window.location.search.substring(1))
            const sort = arrName.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true
        }
    }, [])
    //RU: Если был первый был первый рендер, то запрашиваем пиццы
    //ENG: If there was a first render, then we ask for pizza
    // ↓
    React.useEffect(()=>{
        window.scrollTo(0,0)
            getPizzas();
        isSearch.current = false
    }, [categoryId, sortType, searchValue, currentPage]);


    //Pizzas
    const pizzasItems = items.map((obj) => <PizzaItem key={obj.id} {...obj} src={obj.imageUrl}/>)
    const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index}/>)
    //Render
    return (
        <div className='container'>
            <div className="content__top">
                <Catalog value={categoryId} onClickCategory={onClickCategory} />
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                isLoading === 'error' ? (
                    <div className='content__error-info'>
                    <h2>Каталог пуст 😕</h2>
                    <p>Скорее всего, мы столкнулись с ошибкой, которую в скором времени поладим! </p>
                </div>) : <div className="content__items">{isLoading === 'loading' ?  skeletons: pizzasItems}</div>
            }
            <Pagination value={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

//Another comments
/*
Фильтрация для статичного массива
.filter(obj=>{
        if(obj.title.toLowerCase().includes(prop.value.toLowerCase().trim())){
            return true;
        }
        return false
    })
*/
