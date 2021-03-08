import React from 'react';
import ReactPaginate from 'react-paginate';

import "./index.css";

export default function Pagination({ pageNumber,setPageNumber, pagesCount }) {
  function handlePageClick(data) {
    const selectedPage = data.selected;
    setPageNumber(selectedPage + 1);
  }

  return (
    <ReactPaginate
      onPageChange={handlePageClick}
      previousLabel={<span>&#10094;</span>}
      nextLabel={<span>&#10095;</span>}
      breakLabel={<span className="page-link">...</span>}
      pageCount={pagesCount}
      forcePage={pageNumber - 1}
      containerClassName={'pagination'}
      previousLinkClassName={'page-link'}
      nextLinkClassName={'page-link'}
      disabledClassName={'disabled'}
      activeClassName={'active'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
    />
  )
};