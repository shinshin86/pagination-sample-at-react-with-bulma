import React from "react";

const Pagination = ({ currentPage, totalPage, handleClickPagination }) => {
  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <a
        className="pagination-previous"
        onClick={() => {
          const nextPageNumber = +currentPage - 1;
          handleClickPagination(nextPageNumber);
        }}
        disabled={+currentPage === 1}
      >
        Previous
      </a>
      <a
        className="pagination-next"
        onClick={() => {
          const nextPageNumber = +currentPage + 1;
          handleClickPagination(nextPageNumber);
        }}
        disabled={+currentPage === +totalPage}
      >
        Next page
      </a>
      <ul className="pagination-list">
        {Array.from(new Array(totalPage)).map((v, i) => {
          const pageNumber = ++i;
          return (
            <li key={i}>
              <span
                className={
                  +currentPage === pageNumber
                    ? "pagination-link is-current"
                    : "pagination-link"
                }
                aria-label={
                  +currentPage === pageNumber
                    ? `Page ${pageNumber}`
                    : `Goto page ${pageNumber}`
                }
                aria-current={+currentPage === pageNumber && "page"}
                onClick={() => handleClickPagination(i)}
              >
                {pageNumber}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
