import React from "react";

type PizzaImgProp = {
    img: string
}

export const PizzaImg: React.FC<PizzaImgProp> = (prop) => {
    return(
        <img
            className="pizza-block__image"
            src={prop.img}
            alt="Pizza"
        />
    )
}