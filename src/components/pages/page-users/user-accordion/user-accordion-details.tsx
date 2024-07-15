import { StyledUserAccordionDetail } from "@/styled-components/styled-pages/styled-user/styled-users-list";
import { FC } from "react";
import {
  StyledUserDetailInputWrapper,
  StyledUserDetailsWrapper,
} from "@/styled-components/styled-pages/styled-user/styled-user-details";
import { StyledHeading } from "@/styled-components/styled-global";
import TextFiled from "@/components/UI/ui-text-field";

interface UserAccordionDetailsProps {
  data: { [key: string]: any };
}

export const UserAccordionDetails: FC<UserAccordionDetailsProps> = ({
  data,
}) => {
  return (
    <StyledUserAccordionDetail>
      {/* <UserDetails data={data} userId={id} accordionContent /> */}
      <StyledUserDetailsWrapper $gap="10px">
        <StyledHeading>User Details</StyledHeading>
        <StyledUserDetailInputWrapper>
          {Object.entries(data).map(([key, value]) => (
            <TextFiled
              key={`${key}-${value}`}
              value={value}
              label={key}
              disabled
              aria-disabled
              styles={{
                label: {
                  color: "#fff",
                },
              }}
            />
          ))}
        </StyledUserDetailInputWrapper>
      </StyledUserDetailsWrapper>
    </StyledUserAccordionDetail>
  );
};
