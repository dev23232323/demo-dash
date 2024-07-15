import {
  StyledUserListItem,
  StyledChevron_Right,
} from "@/styled-components/styled-UI/styled-accordion";
import { memo } from "react";
import { Button } from "@/components/UI/ui-button";

export interface AccordionItemProps<P = any, R = void> {
  id: string;
  setIsOpenAccordion: (prop: P) => R;
  isOpenAccordion: boolean;
  accordion_header: any;
  accordion_content: any;
}

export const AccordionItem = memo(
  ({
    id,
    isOpenAccordion,
    setIsOpenAccordion,
    accordion_content: AccordionContent,
    accordion_header: AccordionHeader,
  }: AccordionItemProps) => {
    function toggleAccordion() {
      setIsOpenAccordion(isOpenAccordion ? null : id);
    }

    return (
      <div>
        <StyledUserListItem $isOpen={isOpenAccordion}>
          {AccordionHeader && <AccordionHeader />}
          <Button onClick={toggleAccordion}>
            <StyledChevron_Right $isOpen={isOpenAccordion} />
          </Button>
        </StyledUserListItem>
        {isOpenAccordion && <AccordionContent />}
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";
