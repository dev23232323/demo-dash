import { FC, Suspense, useState } from "react";

// Styled
import { StyledJobAccordionListWrapper } from "@/styled-components/styled-pages/styled-job/styled-job-accordion";

import { Accordion } from "@/components/UI/ui-accordion";
import JobAccordionDetail from "./job-accordion-detail";
import { JobAccordionHeader } from "./job-accordion-header";
import { Jobs } from "@/@types/backend/job.type";

interface JobAccordionListProps {
  jobs: Jobs[];
}

export const JobAccordionList: FC<JobAccordionListProps> = ({ jobs }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState<string | null>(null);

  return (
    <StyledJobAccordionListWrapper>
      {jobs.map((job, i) => {
        const id = job.job.email + String(i);
        const isOpen = isAccordionOpen === id;
        return (
          <Accordion
            key={id}
            id={id}
            setIsOpenAccordion={setIsAccordionOpen}
            isOpenAccordion={isOpen}
            accordion_header={() => (
              <JobAccordionHeader
                email={job.job.email}
                name={job.job.firstName}
              />
            )}
            accordion_content={() => (
              <Suspense fallback={"loading..."}>
                <JobAccordionDetail data={job} />
              </Suspense>
            )}
          />
        );
      })}
    </StyledJobAccordionListWrapper>
  );
};
