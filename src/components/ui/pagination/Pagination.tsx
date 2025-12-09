import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  visibleTotalCount?: boolean;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination = ({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  className,
  visibleTotalCount = false,
}: PaginationProps) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex items-center justify-end gap-3 p-2 ${className}`}>
      {visibleTotalCount && (
        <span>
          Ilość elementów: <strong>{totalCount}</strong>
        </span>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="hover: cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <span className="text-sm font-medium text-gray-700">
        Strona {currentPage} z {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="hover: cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Pagination;
