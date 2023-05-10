//Hooks
import {useState} from "react";
//Component
export const Catalog = () => {
    const [active, setActive] = useState(0)

    const arrayofcategoryes = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]
    const setActiveIndex = (index) => {
        setActive(index)
    }


    return (
        <div className="categories">
            <ul>
                {arrayofcategoryes.map((item, i) => <li
                    onClick={()=> setActiveIndex(i)}
                    className={active === i ? 'active' : ''}
                key='g1'>{item}</li>)}
                {/*<li onClick={()=> setActiveIndex(0)} className={active === 0 ? 'active' : ''}>Все</li>*/}
                {/*<li onClick={()=> setActiveIndex(1)} className={active === 1 ? 'active' : ''}>Мясные</li>*/}
                {/*<li onClick={()=> setActiveIndex(2)} className={active === 2 ? 'active' : ''}>Вегетарианская</li>*/}
                {/*<li onClick={()=> setActiveIndex(3)} className={active === 3 ? 'active' : ''}>Гриль</li>*/}
                {/*<li onClick={()=> setActiveIndex(4)} className={active === 4 ? 'active' : ''}>Острые</li>*/}
                {/*<li onClick={()=> setActiveIndex(5)} className={active === 5 ? 'active' : ''}>Закрытые</li>*/}
            </ul>
        </div>
    )
}