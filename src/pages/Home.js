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
    React.useEffect(()=>{
        fetch('https://6461fbf8491f9402f4af5cab.mockapi.io/Pizza-items').then(res => {
            return res.json()
        }).then(arr=>{
            if(!pizzas.length){
                setPizzas(arr)
                setIsLoading(false)
            }
        })
        window.scrollTo(0,0)
    })

    return (
        <div className='container'>
            <div className="content__top">
                <Catalog/>
                <Sort/>
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