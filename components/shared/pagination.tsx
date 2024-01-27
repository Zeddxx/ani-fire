"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  query: string;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
  paginate: "Search" | "Category" | "Genre",
};

const AnimePagination = ({
  paginate,
  page,
  query,
  hasNextPage,
  currentPage,
  totalPages,
}: PaginationProps) => {
  const [pageNumber, setPageNumber] = useState<number>(page);

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? pageNumber + 1 : pageNumber - 1;
    setPageNumber(pageValue);
  };

  const visiblePages = () => {
    const range = 3;
    const start = Math.max(1, currentPage - range);
    const end = Math.min(totalPages, currentPage + range);

    const firstPages = Array.from(
      { length: Math.min(2, start - 1) },
      (_, index) => index + 1
    );
    const lastPages = Array.from(
      { length: Math.min(2, totalPages - end) },
      (_, index) => end + index + 1
    );

    return [
      ...firstPages,
      ...Array.from({ length: end - start + 1 }, (_, index) => start + index),
      ...lastPages,
    ];
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onClick("prev")}
            className={cn(pageNumber <= 1 && "opacity-50 pointer-events-none")}
            href={paginate === "Search" ? `/search?keyword=${query}&page=${pageNumber}` : paginate === "Genre" ? `/genre/${query}?page=${pageNumber}` : `/anime/${query}?page=${pageNumber}`}
          />
        </PaginationItem>
        {visiblePages().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              href={paginate === "Search" ? `/search?keyword=${query}&page=${page}` : paginate === "Genre" ? `/genre/${query}?page=${page}` : `/anime/${query}?page=${page}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onClick("next")}
            className={cn(
              pageNumber === totalPages && "opacity-50 pointer-events-none"
            )}
            href={paginate === "Search" ? `/search?keyword=${query}&page=${pageNumber}` : paginate === "Genre" ? `/genre/${query}?page=${pageNumber}` : `/anime/${query}?page=${pageNumber}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default AnimePagination;
