/**
 * A pagination hook to get the range by calculating totalPages, pageSize, siblingCount, currentPage;
 * @params totalCount, pageSize, siblingCount, currentPage
 * returns pagination range.
 */

import { range } from "@/lib/utils";
import { useMemo } from "react";

interface Props {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export const usePagination = ({
  currentPage,
  pageSize,
  totalCount,
  siblingCount = 1,
}: Props) => {
  const DOTS = "...";
  const pagination = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // pages count is determined as siblingCount + firstPage + lastPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    // case 1 -> if the number is less than the page numbers we want to show in our pagination component, we return the range [1..totalPageCount]
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots: boolean = leftSiblingIndex > 2;
    const shouldShowRightDots: boolean = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex: number = 1;
    const lastPageIndex: number = totalPageCount;

    //  Case 2: No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [currentPage, totalCount, pageSize, siblingCount]);

  return { pagination, DOTS };
};
