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
};

const AnimePagination = ({
  page,
  query,
  hasNextPage,
  currentPage,
  totalPages,
}: PaginationProps) => {
  const [pageNumber, setPageNumber] = useState<number>(page);
  console.log({ page, query, hasNextPage, currentPage, totalPages });

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? pageNumber + 1 : pageNumber - 1;
    setPageNumber(pageValue);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onClick("prev")}
            className={cn(pageNumber <= 1 && "opacity-50 pointer-events-none")}
            href={`/search?keyword=${query}&page=${pageNumber}`}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = Number(index) + 1
          const isActive = page === currentPage
          return(
            <PaginationItem key={index}>
             <PaginationLink isActive={isActive} href={`/search?keyword=${query}&page=${page}`}>
                {page}
             </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext
            onClick={() => onClick("next")}
            className={cn(pageNumber === totalPages && "opacity-50 pointer-events-none")}
            href={`/search?keyword=${query}&page=${pageNumber}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default AnimePagination;
