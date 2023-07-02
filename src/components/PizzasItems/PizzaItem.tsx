//Hooks
import React from "react";
//Redux
import {useDispatch, useSelector} from "react-redux";
import {addProduct, CartItemType, getCartItems} from "../../redux/Slices/cartSlice";
//IMG
import {PizzaImg} from "./PizzaImg";
//Router
import {Link} from "react-router-dom";
//Variables
const typeName = ['тонкое', "традиционное"];
//Component

type pizzaPropr = {
    id: number,
    title: string,
    price: number,
    src: string,
    type: number[],
    sizes: number[],
    types: []
}

export const PizzaItem: React.FC<pizzaPropr> = (prop) => {
    const dispatch = useDispatch()
    const cartItems = useSelector(getCartItems(prop.id))
    const [activeType, setActiveType] = React.useState(0);
    const [activeSize, setActiveSize] = React.useState(0);

    const addedCount = cartItems ? cartItems.count : 0

    const onClickAdd = () => {
    const item: CartItemType = {
    id: prop.id,
    title: prop.title,
    price: prop.price,
    imageUrl: prop.src,
    type: typeName[activeType],
    size:  prop.sizes[activeSize],
    count: 0
    };
    dispatch(addProduct(item))
    }


    return (
        <div className='pizza-block-wrapper'>
            <div className="pizza-block">
                <Link to={`/pizza/${prop.id}`}>
                <PizzaImg img={prop.src}/>
                <h4 className="pizza-block__title">{prop.title}</h4>
                </Link>
                <div className="pizza-block__selector">
                    <ul>
                        {prop.types.map((type, i)=><li
                            className={activeType === i ? 'active' : ''}
                            onClick={()=>setActiveType(i)}
                            key={i}>{typeName[type]}</li>)}
                    </ul>
                    <ul>
                        {prop.sizes.map((size, i) => <li
                            className={activeSize === i ? 'active' : ''}
                            onClick={()=>setActiveSize(i)}
                            key={i}>{size} см</li>)}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {prop.price} ₴</div>
                    <button onClick={onClickAdd} className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    )
}