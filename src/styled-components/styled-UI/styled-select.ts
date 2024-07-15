"use client";
import styled, { css } from "styled-components";

export const StyledSelectWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
`;

interface StyledTSelectLabelProps {
  $error?: string | boolean;
  styles?: string | any;
}

export const StyledSelectLabel = styled.label<StyledTSelectLabelProps>`
  position: absolute;
  top: -10px;
  left: 8px;

  transform: translate(-2px, 5px) scale(0.75);
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  transform-origin: top left;
  cursor: default;

  color: ${({ theme }) => theme.colors.secondary.main};
  font-size: ${({ theme }) => theme.fonts.size.medium};

  ${({ $error, theme }) =>
    $error &&
    css`
      color: ${theme.colors.danger};
    `};

  &::first-letter {
    text-transform: uppercase;
  }
`;

interface StyledSelectProps {
  $error?: string | boolean;
  styles?: string | any;
}

export const StyledSelect = styled.select<StyledSelectProps>`
  background: none;
  outline: none;
  border: none;
  padding: 8px 0;
  margin-top: 15px;

  width: 100%;
  transition: box-shadow ease-in-out 200ms;

  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.style.borderRadius};
  padding: 10px 5px;

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.primary[900]};
  }

  border: 1px solid
    ${(props) => (!!props.$error ? props.theme.colors.danger : "none")};

  font-size: ${({ theme }) => theme.fonts.size.medium};
  color: ${({ theme }) => theme.colors.primary[500]};

  ${(props) => props.styles};
`;

export const StyledOptgroup = styled.optgroup`
  color: #000;
`;

export const StyledOption = styled.option`
  color: #000;
`;
