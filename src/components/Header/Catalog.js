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
                    key={i}>{item}</li>)}
            </ul>
        </div>
    )
}