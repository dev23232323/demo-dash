"use client";
import React, { useState, forwardRef } from "react";

import {
  StyledTextFieldRoot,
  StyledTextFieldDescription,
  StyledTextFieldEndAdornment,
  StyledTextFieldError,
  StyledTextFieldInput,
  StyledTextFieldInputField,
  StyledTextFieldLabel,
} from "@/styled-components/styled-UI/styled-input";
import { Search } from "./ui-icons";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  name?: string;
  endAdornment?: React.ReactNode | React.ReactNode[];
  description?: string;
  styles?: {
    root?: React.CSSProperties;
    label?: React.CSSProperties;
    error?: React.CSSProperties;
    description?: React.CSSProperties;
    input?: React.CSSProperties;
    inputField?: React.CSSProperties;
    endAdornment?: React.CSSProperties;
  };
}

export const TextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      label,
      error,
      name,
      endAdornment,
      styles,
      description,
      ...rest
    }: Props,
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    // const localRef = useRef<HTMLInputElement | null>(null);
    // const inputRef =
    //   (ref as React.MutableRefObject<HTMLInputElement | null>) || localRef;

    const specialInput = [
      "file",
      "color",
      "date",
      "datetime-local",
      "month",
      "week",
      "time",
    ];

    const labelShrink =
      (value !== "" && value !== undefined) ||
      specialInput.includes(rest.type as any);
    const displayError = !!error;

    const handleBlurCapture = (event: React.FocusEvent<HTMLInputElement>) => {
      if (!event.target.value) {
        setFocused(false);
      }
      rest.onBlurCapture && rest.onBlurCapture(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      rest.onFocus && rest.onFocus(event);
    };

    return (
      <StyledTextFieldRoot
        styles={{
          ...styles?.root,
          "margin-top": label && "20px",
          "margin-bottom": description && "15px",
        }}
      >
        {label && (
          <StyledTextFieldLabel
            styles={styles?.label}
            $error={displayError}
            $shrink={focused || labelShrink}
            htmlFor={rest.id}
          >
            {label}
          </StyledTextFieldLabel>
        )}

        <StyledTextFieldInput
          styles={styles?.input}
          $error={displayError}
          $padding={rest.type === "search"}
          $displayError={displayError}
          $showOutline={focused}
        >
          {rest.type === "search" && <Search stroke="#000" />}
          <StyledTextFieldInputField
            ref={ref}
            value={value}
            name={name}
            styles={styles?.inputField}
            onBlurCapture={handleBlurCapture}
            onFocus={handleFocus}
            {...rest}
          />

          {endAdornment && (
            <StyledTextFieldEndAdornment styles={styles?.endAdornment}>
              {endAdornment}
            </StyledTextFieldEndAdornment>
          )}
        </StyledTextFieldInput>

        {description && (
          <StyledTextFieldDescription styles={styles?.description}>
            {description}
          </StyledTextFieldDescription>
        )}

        {displayError && (
          <StyledTextFieldError styles={styles?.error}>
            {error}
          </StyledTextFieldError>
        )}
      </StyledTextFieldRoot>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
