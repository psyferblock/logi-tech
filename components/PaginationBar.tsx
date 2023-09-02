import Link from "next/link";
import React from "react";

interface PaginationBarPropsInterface {
  currentPage: number;
  totalPages: number;
}
function PaginationBar({
  currentPage,
  totalPages,
}: PaginationBarPropsInterface) {
  // the best way to understand function logic is to see its behaviour so playing with the patameters of hte funcitons adds a lot of value to your logic and understanding

  // first we have to decide on the max ammount of pages that will be
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems: JSX.Element[] = []; //the numbered page items is the array of pages we have on the browser for the numbering on the pagination bar.

  // then we create a for loop for their links in order to connect to each page .
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={"?page=" + page}
        key={page}
        className={`join-item btn ${
          currentPage === page ? "btn-active pointer-events-none " : ""
        }`}
      >
        {page}
      </Link>
    );
  }
  return (
    <>
      <div className="join hidden sm:block ">{numberedPageItems}</div>
      <div className="join block sm:hidden ">
        {currentPage > 1 && (
          <Link href={"?page=" + (currentPage - 1)} className="btn join-item">
            «
          </Link>
        )}
        <button className="join-item btn pointer-events-none">
          Page {currentPage}
        </button>
        {currentPage < totalPages && (
          <Link href={"?page=" + (currentPage + 1)} className="join-item btn">
            »
          </Link>
        )}
      </div>
    </>
  );
}

export default PaginationBar;
