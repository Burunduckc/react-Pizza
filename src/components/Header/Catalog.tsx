//Component
import React from "react";

type Caregories = {
    value: number,
    onClickCategory: any
}
export const Catalog: React.FC<Caregories> = ({value, onClickCategory}) => {
    const arrayOfCategory = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]


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
}