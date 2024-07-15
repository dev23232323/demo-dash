"use client";
import { Chevron_Right } from "@/components/UI/ui-icons";
import styled, { css } from "styled-components";

interface BaseAccordionProp {
  $isOpen: boolean;
}

export const StyledUserListItem = styled.div<BaseAccordionProp>`
  padding: 10px 15px;
  border-radius: ${(props) => props.theme.style.borderRadius};
  background-color: ${(props) => props.theme.colors.primary[900]};
  transition: all ease-in-out 0.2s;

  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: 9;
  position: relative;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      box-sizing: border-box;
      box-shadow: 2px 5px 5px #000;
    `}
`;

export const StyledChevron_Right = styled(Chevron_Right)<BaseAccordionProp>`
  transform: rotate(0deg);
  transition: all ease-in-out 0.2s;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: rotate(90deg);
    `}
`;
