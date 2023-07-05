//Component
import React from "react";
type Caregories = {
    value: number,
    onClickCategory: (id: number) => void
}

const arrayOfCategory = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
]
export const Catalog: React.FC<Caregories> = React.memo(({value, onClickCategory}) => {


    return (
        <div className="categories">
            <ul>
                {arrayOfCategory.map((categoryName, i: number) => <li
                    onClick={()=> onClickCategory(i)}
                    className={value === i ? 'active' : ''}
                    key={i}>{categoryName}</li>)}
            </ul>
        </div>
    )
})