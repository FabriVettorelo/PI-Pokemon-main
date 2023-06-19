import React from 'react';
import style from "../Home/Container.module.css"

const Paginado = ({ currentPage, totalPages, onChangePage }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  return (
    <div>
      <button className={style.pag} onClick={handlePreviousPage} disabled={currentPage === 1}>Prev</button>
      <span className={style.paginas}> Page {currentPage} of {totalPages} </span>
      <button className={style.pag} onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default Paginado;