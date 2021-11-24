import React, { Component, useEffect, useMemo, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination';

const PaginationCount = ({itemperpage = 0,totalItems = 0,currentPage = 1,onPageChange}) => {


  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
      if (totalItems > 0 && itemperpage > 0)
          setTotalPages(Math.ceil(totalItems / itemperpage));
  }, [totalItems, itemperpage]);

  const paginationItems = useMemo(() => {


      const pages = [];

      if(currentPage > totalPages){
        currentPage = totalPages
      }

      for (let i = 1; i <= totalPages; i++) {
          pages.push(
              <Pagination.Item
                  key={i}
                  active={i === currentPage}
                  onClick={() => onPageChange(i)}
              >
                  {i}
              </Pagination.Item>
          );
      }

      return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  
    return (
          <Pagination>
              <Pagination.Prev
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
              />
          {paginationItems}
            <Pagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
      </Pagination>
    )
}

export default PaginationCount
