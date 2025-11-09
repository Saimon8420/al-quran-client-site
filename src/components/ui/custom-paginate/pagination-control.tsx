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

interface Reference {
  surah: number;
  ayah: number;
}

interface PaginationControlProps {
  references: Reference[];
  path: string;
  siblingCount?: number;
}

const CustomPaginate = ({
  references,
  path,
  siblingCount,
}: PaginationControlProps) => {
  const { surah, ayah } = useParams();

  const navigate = useNavigate();

  const totalPages = references?.length || 0;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const currentPageIndex = references?.findIndex(
      (item) => item.surah === Number(surah) && item.ayah === Number(ayah)
    );
    if (currentPageIndex !== -1) {
      setCurrentPage(currentPageIndex + 1);
    }
  }, [surah, ayah, references]);

  const paginationRange = usePagination({
    currentPage,
    totalCount: totalPages,
    siblingCount: siblingCount,
    pageSize: 1,
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const item = references[page - 1];
      if (item) {
        navigate(`/${path}/${item.surah}/${item.ayah}`);
        setCurrentPage(page);
      }
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
            className=""
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

export default CustomPaginate;
