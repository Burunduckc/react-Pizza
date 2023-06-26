//React
    import React from "react";
    import ReactPaginate from "react-paginate";
//Styles
import styles from './pagination.module.scss'
//Component
export const Pagination = ({value, onChangePage}) => {
    return(
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e=>onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={value - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}