import { Typography } from "@/styled-components/styled-global";
import {
  StyledJobAccordionHeaderWrapper,
  StyledUserProfilePic,
} from "@/styled-components/styled-pages/styled-job/styled-job-accordion";

import React, { FC } from "react";

interface JobAccordionHeaderProps {
  name: string;
  email: string;
}

export const JobAccordionHeader: FC<JobAccordionHeaderProps> = ({
  email,
  name,
}) => {
  return (
    <StyledJobAccordionHeaderWrapper>
      <StyledUserProfilePic
        src={`https://api.dicebear.com/8.x/initials/svg?seed=${name}`}
        alt={`${name} profile picture`}
      />
      <div>
        <Typography>{name}</Typography>
        <Typography $size="sm">{email}</Typography>
      </div>
    </StyledJobAccordionHeaderWrapper>
  );
};
