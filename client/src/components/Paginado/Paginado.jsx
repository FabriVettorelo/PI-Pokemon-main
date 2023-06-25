import React from 'react';
import style from "../Home/Container.module.css"

const Paginado = ({ currentPage, totalPages, onChangePage }) => {
  //este componente sirve para manejar el paginado y mantener un poco mas limpio el home
  //este handler sirve para indicar cual es la "previous page" es decir la anterior a donde estamos parados
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };
// este sirve para indicar la pagina que tenemos a continuacion de donde estamos parados
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };


  const handleLastPage = () => {
    if (currentPage < totalPages) {
      onChangePage(totalPages);
    }
  };

  const handleFirstPage = () => {
    if (currentPage < totalPages) {
      onChangePage(1);
    }
  };

//para facilitar la navegacion y saber con cuanto contenido lidiamos ,coloco un texto indicando la pagina donde estamos parados y el total de paginas que son, ademas porsupuesto de los botones necesarios para navegar por el contenido
  return (
    <div>
      <button className={style.pag} onClick={handleFirstPage} disabled={currentPage === 1}>first</button>
      <button className={style.pag} onClick={handlePreviousPage} disabled={currentPage === 1}>Prev</button>
      <span className={style.paginas}> Page {currentPage} of {totalPages} </span>
      <button className={style.pag} onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      <button className={style.pag} onClick={handleLastPage} disabled={currentPage === totalPages}>last</button>
    </div>
  );
};

export default Paginado;