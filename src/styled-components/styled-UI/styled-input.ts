"use client";
import styled, { css } from "styled-components";

// ----------------------------------
interface StyledTextFieldRootProps {
  styles?: string | any;
}

export const StyledTextFieldRoot = styled.div<StyledTextFieldRootProps>`
  display: inline-block;
  position: relative;
  width: 100%;

  ${(props) => props.styles};
`;

interface StyledTextFieldLabelProps {
  $shrink: boolean;
  $error?: string | boolean;
  styles?: string | any;
}

export const StyledTextFieldLabel = styled.label<StyledTextFieldLabelProps>`
  position: absolute;
  top: -25px;
  left: 8px;

  transform: translate(0, 32px) scale(1);
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  transform-origin: top left;
  cursor: text;
  pointer-events: none;

  color: ${({ theme }) => theme.colors.secondary.main};
  font-size: ${({ theme }) => theme.fonts.size.medium};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};

  ${({ $error, theme }) =>
    $error &&
    css`
      color: ${theme.colors.danger};
    `};

  ${({ $shrink }) =>
    $shrink &&
    css`
      transform: translate(-2px, 5px) scale(0.75);
      cursor: default;
    `};

  &::first-letter {
    text-transform: uppercase;
  }

  ${(props) => props.styles};
`;

interface StyledTextFieldInputProps {
  $error?: string | boolean;
  $padding: boolean;
  styles?: string | any;
  $displayError?: boolean;
  $showOutline?: boolean;
}

export const StyledTextFieldInput = styled.div<StyledTextFieldInputProps>`
  display: flex;
  align-items: center;

  ${(props) =>
    props.$padding &&
    css`
      padding: 0 10px;
    `}

  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.style.borderRadius};

  ${({ $error, theme }) =>
    $error &&
    css`
      border-color: ${theme.colors.danger};
    `};

  outline: ${(props) => {
    if (props.$displayError) {
      return `1px solid ${props.theme.colors.danger}`;
    }
    if (props.$showOutline) {
      return `1px solid ${props.theme.colors.primary[900]}`;
    }
    return "none";
  }};

  ${(props) => props.styles};
`;

interface StyledTextFieldInputFieldProps {
  styles?: string | any;
}

export const StyledTextFieldInputField = styled.input<StyledTextFieldInputFieldProps>`
  background: none;
  outline: none;
  border: none;
  padding: 10px 0;

  width: 100%;
  transition: box-shadow ease-in-out 200ms;

  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.style.borderRadius};
  padding: 10px 5px;
  /* 
  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.primary[900]};
  } */

  font-size: ${({ theme }) => theme.fonts.size.medium};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.primary[500]};

  ${(props) => props.styles};
`;

interface StyledTextFieldEndAdornmentProps {
  styles?: string | any;
}

export const StyledTextFieldEndAdornment = styled.span<StyledTextFieldEndAdornmentProps>`
  margin-left: 12px;

  ${(props) => props.styles};
`;

interface StyledTextFieldErrorProps {
  styles?: string | any;
}

export const StyledTextFieldError = styled.div<StyledTextFieldErrorProps>`
  margin-top: 8px;
  line-height: 1.66;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fonts.size.small};

  ${(props) => props.styles};
`;

interface StyledTextFieldDescriptionProps {
  styles?: string | any;
}

export const StyledTextFieldDescription = styled.div<StyledTextFieldDescriptionProps>`
  line-height: 1.66;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fonts.size.small};

  ${(props) => props.styles};
`;
