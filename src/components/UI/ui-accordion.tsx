import {
  StyledChevron_Right,
  StyledAccordion,
} from "@/styled-components/styled-UI/styled-accordion";
import React, { memo } from "react";
import { Button } from "@/components/UI/ui-button";

export interface AccordionProps<P = any, R = void> {
  id: string;
  setIsOpenAccordion: (prop: P) => R;
  isOpenAccordion: boolean;
  accordion_header: () => JSX.Element;
  accordion_content: () => JSX.Element;
}

export const Accordion: React.FC<AccordionProps> = memo(
  ({
    id,
    isOpenAccordion,
    setIsOpenAccordion,
    accordion_content: AccordionContent,
    accordion_header: AccordionHeader,
  }) => {
    function toggleAccordion() {
      setIsOpenAccordion(isOpenAccordion ? null : id);
    }

    return (
      <div>
        <StyledAccordion $isOpen={isOpenAccordion}>
          {AccordionHeader && <AccordionHeader />}
          <Button onClick={toggleAccordion}>
            <StyledChevron_Right $isOpen={isOpenAccordion} />
          </Button>
        </StyledAccordion>
        {isOpenAccordion && <AccordionContent />}
      </div>
    );
  },

  // Memoize based on if open value changes to prevent unnecessary re-renders
  (prevProps, nextProps) =>
    prevProps.isOpenAccordion === nextProps.isOpenAccordion
);

Accordion.displayName = "Accordion";
