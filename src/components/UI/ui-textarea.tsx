import {
  StyledTextFieldInput,
  StyledTextFieldInputField,
  StyledTextFieldLabel,
  StyledTextFieldRoot,
  StyledTextFieldDescription,
  StyledTextFieldError,
} from "@/styled-components/styled-UI/styled-input";
import { forwardRef, useState } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  name?: string;
  description?: string;
  styles?: {
    root?: React.CSSProperties;
    label?: React.CSSProperties;
    error?: React.CSSProperties;
    description?: React.CSSProperties;
    input?: React.CSSProperties;
    inputField?: React.CSSProperties;
  };
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { value, label, error, name, styles, description, ...rest }: TextAreaProps,
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    const labelShrink = value !== "" && value !== undefined;
    const displayError = !!error;

    const handleBlurCapture = (
      event: React.FocusEvent<HTMLTextAreaElement>
    ) => {
      if (!event.target.value) {
        setFocused(false);
      }
      rest.onBlurCapture && rest.onBlurCapture(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
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
          $padding={false}
        >
          <StyledTextFieldInputField
            as="textarea"
            ref={ref}
            value={value}
            name={name}
            styles={styles?.inputField}
            onBlurCapture={handleBlurCapture}
            onFocus={handleFocus}
            {...rest}
          />
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

TextArea.displayName = "TextArea";
export default TextArea;
