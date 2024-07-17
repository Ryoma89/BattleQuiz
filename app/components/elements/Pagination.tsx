import React from "react";
import { PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="mt-10 mx-auto max-w-sm">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageClick(currentPage > 1 ? currentPage - 1 : currentPage)}
          />
        </PaginationItem>
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
              onClick={() => handlePageClick(pageNumber + 1)}
              isActive={currentPage === pageNumber + 1}
            >
              {pageNumber + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageClick(currentPage < totalPages ? currentPage + 1 : currentPage)}
          />
        </PaginationItem>
      </PaginationContent>
    </div>
  );
};

export default Pagination;
