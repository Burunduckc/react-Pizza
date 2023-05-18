//React
import React from "react";
//UI
import {Catalog} from "../components/Header/Catalog";
import {Sort} from "../components/Header/Sort";
import {PizzaSkeleton} from "../components/PizzasItems/SkeletonPizza";
import {PizzaItem} from "../components/PizzasItems/PizzaItem";
//Component
export const Home = (prop) => {
    const [pizzas, setPizzas] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0)
    const [sortType, setSortType] = React.useState({
        name: 'Популярности',
        sort: 'rating'
    })
    React.useEffect(()=>{
        setIsLoading(true)

        const sortBy = sortType.sort.replace('-', '')
        const order = sortType.sort.includes('-') ? 'asc' : 'desc'
        const search = prop.value ? `&search=${prop.value}` : '';
        fetch(`https://6461fbf8491f9402f4af5cab.mockapi.io/Pizza-items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => res.json())
            .then(arr=>{
                setPizzas(arr)
                setIsLoading(false)
            })
        window.scrollTo(0,0)
    }, [categoryId, sortType, prop.value])

    const pizzasItems = pizzas.map((obj) => <PizzaItem key={obj.id} {...obj} src={obj.imageUrl}/>)
    const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index}/>)
    return (
        <div className='container'>
            <div className="content__top">
                <Catalog value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
                <Sort value={sortType} onClickSort={(i)=> setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ?  skeletons: pizzasItems}
            </div>
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
