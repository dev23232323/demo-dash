"use client";
import styled from "styled-components";

// Job accordion header
export const StyledJobAccordionHeaderWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const StyledUserProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

// Job accordion list
export const StyledJobAccordionListWrapper = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background-color: ${(props) => props.theme.colors.primary[700]};
`;

export const StyledJobDetailInputWrapper = styled.div`
  display: grid;
  gap: 40px;
  margin: 10px 0;

  @media screen and (min-width: 741px) {
    grid-template-columns: 1fr 1fr;
  }
`;

// Job accordion details
export const StyledAccordionJobDetailsWrapper = styled.section<{
  $gap?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap || "50px"};

  padding: 20px;

  background-color: ${(props) => props.theme.colors.primary[400]};
  border-bottom-left-radius: ${(props) => props.theme.style.borderRadius};
  border-bottom-right-radius: ${(props) => props.theme.style.borderRadius};
`;

export const StyledJobActionButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
