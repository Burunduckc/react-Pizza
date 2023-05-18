import React from "react";
import styles from './notfoundblock.module.scss'
export const NotFoundBlock = () => {
    return(
        <div className={styles.root}>
            <h1><span>😞</span>
                <br/>
                Ничего не найдено
            </h1>
            <h2 className={styles.Subroot}>К огромному нашему сожелению, такой страницы не существует,<br/> как вашей супер пиццы.</h2>
        </div>
    )
}