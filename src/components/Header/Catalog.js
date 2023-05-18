//Component
export const Catalog = (prop) => {
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
                {arrayOfCategory.map((categoryName, i) => <li
                    onClick={()=> prop.onClickCategory(i)}
                    className={prop.value === i ? 'active' : ''}
                    key={i}>{categoryName}</li>)}
            </ul>
        </div>
    )
}