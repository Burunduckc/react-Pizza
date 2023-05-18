//React
    import React from "react";
//UI
import {Catalog} from "../components/Header/Catalog";
import {Sort} from "../components/Header/Sort";
import {PizzaSkeleton} from "../components/PizzasItems/SkeletonPizza";
import {PizzaItem} from "../components/PizzasItems/PizzaItem";
//Component
export const Home = () => {
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

        fetch(`https://6461fbf8491f9402f4af5cab.mockapi.io/Pizza-items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortBy}&order=${order}`)
            .then(res => res.json())
            .then(arr=>{
                setPizzas(arr)
                setIsLoading(false)
        })
        window.scrollTo(0,0)
    }, [categoryId, sortType])

    return (
        <div className='container'>
            <div className="content__top">
                <Catalog value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
                <Sort value={sortType} onClickSort={(i)=> setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index}/>)
                        : pizzas.map((obj) => <PizzaItem key={obj.id} {...obj} src={obj.imageUrl}/>)
                }
            </div>
        </div>
    )
}