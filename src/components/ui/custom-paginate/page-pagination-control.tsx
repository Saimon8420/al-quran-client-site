import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DOTS, usePagination } from "@/hooks/use-pagination";

interface PagePaginationControlProps {
  totalPages: number;
  path: string;
  siblingCount?: number;
}

const PagePaginationControl = ({
  totalPages,
  path,
  siblingCount,
}: PagePaginationControlProps) => {
  const { page: pageNumber } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(Number(pageNumber) || 1);

  useEffect(() => {
    setCurrentPage(Number(pageNumber) || 1);
  }, [pageNumber]);

  const paginationRange = usePagination({
    currentPage,
    totalCount: totalPages,
    siblingCount: siblingCount,
    pageSize: 1,
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      navigate(`/${path}/${page}`);
      setCurrentPage(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="flex w-fit flex-wrap">
      <PaginationContent className="flex flex-wrap">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {paginationRange?.map((page, index) => {
          if (page === DOTS) {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PagePaginationControl;
