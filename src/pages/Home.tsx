//React
import React from "react";
import {useNavigate} from 'react-router-dom'
//QS
import qs from 'qs'
//Redux
import {
    getFilterListSelect,
    getFilterPropertySelect,
    getFilterSelect,
    setCategoryId,
    setCurrentPage,
    setFilters
} from "../redux/Slices/filterSlice";
import {useSelector} from "react-redux";
import {fetchPizzas, pizzaSelect} from "../redux/Slices/pizzasSlice";
//UI
import {arrName} from "../components/Header/Sort";
import {useAppDispatch} from "../redux/store";
import {Pagination, Catalog, PizzaSkeleton, PizzaItem, Sort} from '../components'
//Component
export const Home: React.FC =  () => {
    //use
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    //StatesRef
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    //Selectors
    const sortType = useSelector(getFilterPropertySelect)
    const {currentPage, categoryId, searchValue} = useSelector(getFilterSelect);
    const {items, isLoading} = useSelector(pizzaSelect)
    const sort = useSelector(getFilterListSelect)
    //Functions
    const onClickCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [dispatch])

    const onChangePage = (num: number) =>{
    dispatch(setCurrentPage(num))
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
    }, [categoryId, sortType, currentPage, navigate])

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
    })
    //RU: Если был первый был первый рендер, то запрашиваем пиццы
    //ENG: If there was a first render, then we ask for pizza
    // ↓
    React.useEffect(()=>{
        window.scrollTo(0,0)
            getPizzas();
        isSearch.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, sortType, searchValue, currentPage]);


    //Pizzas
    const pizzasItems = items.map((obj: any) => <PizzaItem key={obj.id} {...obj} src={obj.imageUrl}/>)
    const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index}/>)
    //Render
    return (
        <div className='container'>
            <div className="content__top">
                <Catalog value={categoryId} onClickCategory={onClickCategory} />
                <Sort value = {sort}/>
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
