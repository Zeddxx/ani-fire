"use client";

import { useMemo } from "react";
import useMediaQueries from "./use-media-queries";

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
  const isMobile = useMediaQueries("(max-width: 640px)");
  return useMemo(() => {
    const pagesToShow = isMobile ? 3 : 4;
    const splitPage = isMobile ? 1 : 2;

    let startPage = Math.max(1, currentPage - splitPage);
    let endPage = Math.min(totalPages, currentPage + splitPage);

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
  }, [currentPage, hasNextPage, totalPages, isMobile]);
};

export default usePagination;
