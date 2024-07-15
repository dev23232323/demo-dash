"use client";
import React, { forwardRef } from "react";
import { IconType } from "@/components/UI/ui-icons";
import {
  buttonIconAlign,
  buttonSize,
  buttonVariant,
} from "@/@types/ButtonType";
import {
  StyledButton,
  StyledAnimationRotating,
} from "@/styled-components/styled-UI/styled-button";

interface _buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: IconType;
  size?: buttonSize;
  variant?: buttonVariant;
  loading?: boolean;
  iconAlign?: buttonIconAlign;
  isActive?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, _buttonProps>(
  (
    {
      children,
      icon: Icon,
      size,
      disabled,
      loading = false,
      iconAlign = "start",
      isActive = false,
      variant = "primary",
      ...rest
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        $size={size}
        disabled={disabled}
        $disabled={!!disabled || loading}
        $iconAlign={iconAlign}
        $isActive={isActive}
        $buttonVariant={variant}
        {...rest}
      >
        {loading ? (
          <StyledAnimationRotating />
        ) : (
          <>
            {Icon && <Icon size={20} />}
            {children}
          </>
        )}
      </StyledButton>
    );
  }
);

Button.displayName = "button";
export default Button;
