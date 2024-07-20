import {
  StyledCardWrapper,
  StyledCardDescription,
  StyledCardDetails,
  StyledCardImage,
  StyledCardTypography,
  StyledCardFooter,
  StyledCardContent,
} from "@/styled-components/styled-UI/styled-card";
import React, { FC } from "react";

interface CardProps {
  imageUrl: string;
  imageAlt?: string;
  children: React.ReactNode;
}

const Card: FC<CardProps> = ({ imageUrl, imageAlt, children }) => {
  return (
    <StyledCardWrapper>
      <StyledCardImage src={imageUrl} alt={imageAlt} />
      <StyledCardDetails>{children}</StyledCardDetails>
    </StyledCardWrapper>
  );
};
export default Card;

export {
  StyledCardDescription as CardDescription,
  StyledCardFooter as CardFooter,
  StyledCardTypography as CardTypography,
  StyledCardContent as CardContent,
};
