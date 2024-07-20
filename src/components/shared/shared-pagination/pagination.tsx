import { Button } from "@/components/UI/ui-button";
import { Chevron_Left, Chevron_Right, Ellipsis } from "@CustomIcon";
import {
  StyledPaginationButtonsWrapper,
  StyledPaginationWrapper,
} from "@/styled-components/styled-shared/styled-pagination";
import { FC } from "react";
import { PaginationType } from "@/@types/backend/pagination.type";
import { theme } from "@/styled-components/styled-theme";

interface PaginationProps<T = any> extends PaginationType<T> {
  align?: "left" | "right";
  onButtonClick: (button: "next" | "previous") => void;
  jumpToPage: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  align = "right",
  page: currentPage,
  hasNext,
  hasPrevious,
  onButtonClick,
  jumpToPage,
  totalPages,
}) => {
  return (
    <StyledPaginationWrapper $align={align}>
      <StyledPaginationButtonsWrapper>
        <Button
          onClick={() => onButtonClick("previous")}
          disabled={!hasPrevious}
          title={`Goto previous page ${currentPage - 1}`}
        >
          <Chevron_Left />
        </Button>
        {hasPrevious && (
          <>
            <Button
              variant="ghost"
              onClick={() => jumpToPage(1)}
              title={`Jump to first page`}
            >
              1
            </Button>
            <Ellipsis stroke={theme.colors.primary[900]} />
          </>
        )}
        <Button variant="outline" size="lg">
          {currentPage}
        </Button>
        {hasNext && (
          <>
            <Ellipsis stroke={theme.colors.primary[900]} />
            <Button
              variant="ghost"
              onClick={() => jumpToPage(totalPages)}
              title="Jump to last page"
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          iconAlign="end"
          onClick={() => onButtonClick("next")}
          disabled={!hasNext}
          title={`Goto next page ${currentPage + 1}`}
        >
          <Chevron_Right />
        </Button>
      </StyledPaginationButtonsWrapper>
    </StyledPaginationWrapper>
  );
};
