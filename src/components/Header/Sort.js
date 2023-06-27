//React
import React from "react";
//Redux
import {useDispatch, useSelector} from "react-redux";
import {setSort} from "../../redux/Slices/filterSlice";
//Component
export const arrName = [
    {name:'популярности', sortProperty:'rating'},
    {name:'цене(убывание)', sortProperty:'price'},
    {name:'цене(возрастание)', sortProperty: '-price'},
    {name:'алфавиту', sortProperty:'alphabet'}
]
export const Sort = () => {
    const dispatch = useDispatch();
    const list = useSelector(state=>state.filters.sortType)
    const sortRef = React.useRef()
    console.log(sortRef)

    const [isVisible, setIsVisible] = React.useState(false)
    const onClickItem = (obj) => {
        dispatch(setSort(obj))
        console.log(obj)
        setIsVisible(false)
    }

    React.useEffect(() => {
        const clickOutside = (event) => {
            let path = event.path || event.composedPath()
            if (!path.includes(sortRef.current)){
                setIsVisible(false)
                console.log('Click outside')
            }
        }
        document.body.addEventListener('click', clickOutside);
        return () => {
            console.log('Sort unmount')
            document.body.removeEventListener('click', clickOutside)
        }
    }, [])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={()=> setIsVisible(!isVisible)}>{list.name}</span>
            </div>
            {isVisible && (
                <div className="sort__popup">
                    <ul>
                        {arrName.map((item, i) => (
                            <li className={list.sortProperty === item.sort ? 'active' : ''}
                                key={i}
                                onClick={()=> onClickItem(item)}>{item.name}</li>
                        ))}
                    </ul>
                </div>)}
        </div>
    )
}