import React from 'react';
import { Pagination as BootPagination } from 'react-bootstrap';

import './index.css';

export default function Pagination({ pagesCount, setPage, pageNumber }) {

  const createPagination = (pagesCount) => {
    let arr = [];

    for (let i = 1; i <= pagesCount; i++) {
      arr.push(
        <BootPagination.Item
          key={i}
          active={i === pageNumber}
        >
          {i}
        </BootPagination.Item>
      )
    };
    return arr;
  }

  return (
    <BootPagination
      id="pagination"
      onClick={(e) => setPage(e)}
    >
      <BootPagination.Prev className="arrow-left" />

      {createPagination(pagesCount)}

      <BootPagination.Next className="arrow-right" />
    </BootPagination>
  )
}