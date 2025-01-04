"use client";

import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

const usePagination = ({
  currentPage,
  hasNextPage,
  totalPages,
}: PaginationProps) => {
  return useMemo(() => {
    const pagesToShow = 4;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < pagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + pagesToShow - 1);
      } else {
        startPage = Math.max(1, endPage - pagesToShow + 1);
      }
    }

    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }, [currentPage, hasNextPage, totalPages]);
};

export default usePagination;
