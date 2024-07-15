import {
  buttonIconAlign,
  buttonSize,
  buttonVariant,
} from "@/@types/ButtonType";
import { LoaderCircle } from "@/components/UI/ui-icons";
import styled, { css } from "styled-components";

interface StyledButton {
  $size: buttonSize | undefined;
  $disabled: boolean;
  $iconAlign: buttonIconAlign;
  $isActive: boolean;
  $buttonVariant: buttonVariant;
}

export const StyledButton = styled.button<StyledButton>`
  background-color: ${(props) =>
    !props.$disabled &&
    props.$buttonVariant === "primary" &&
    props.theme.colors.primary[900]};

  background-color: ${(props) =>
    props.$isActive && props.theme.colors.primary[800]};

  width: ${({ $size }) => ($size === "full" ? "100%" : "fit-content")};
  border-radius: ${({ theme }) => theme.style.borderRadius};

  outline: none;
  border: none;

  padding: 10px 15px;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  scale: ${(prop) => {
    if (prop.$size === "sm") {
      return 0.9;
    } else if (prop.$size === "md") {
      return 1.1;
    } else if (prop.$size === "lg") {
      return 1.2;
    }
    return 1;
  }};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  flex-direction: ${(props) =>
    props.$iconAlign === "start" ? "row" : "row-reverse"};

  &:hover {
    background-color: ${(props) =>
      !props.$disabled && props.theme.colors.primary[800]};
    color: ${(props) => props.theme.colors.white};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.white};
  }

  ${(props) =>
    props.$disabled &&
    css`
      cursor: not-allowed;
    `}

  ${({ $buttonVariant }) =>
    $buttonVariant === "ghost" &&
    css`
      background-color: transparent;
      color: ${(props) => props.theme.colors.primary[900]};
    `}
      
  ${({ $buttonVariant }) =>
    $buttonVariant === "outline" &&
    css`
      background-color: transparent;
      color: ${(props) => props.theme.colors.primary[900]};
      outline: 2px solid ${(props) => props.theme.colors.primary[900]};
    `}
`;

export const StyledAnimationRotating = styled(LoaderCircle)`
  animation: loading 1s linear infinite;
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
