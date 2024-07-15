"use client";
import { RootState } from "@/state/store";
import { Typography } from "@/styled-components/styled-global";
import {
  StyledCustomImage,
  StyledImageCard,
  StyledImageGrid,
  StyledImageWrapper,
} from "@/styled-components/styled-shared/styled-tip-tap/styled-tiptap-image";

import React, { FC } from "react";
import { useSelector } from "react-redux";

interface TiptapImageGridProps {}

const TiptapImageGrid: FC<TiptapImageGridProps> = ({}) => {
  const allImages = useSelector((state: RootState) => state.image);

  return (
    <>
      {allImages.length <= 0 && (
        <p>
          No images are added add a image bu click add image button on the top
          right corner
        </p>
      )}

      <StyledImageGrid>
        {allImages.map((image, i) => {
          return (
            <StyledImageCard key={i}>
              <StyledImageWrapper>
                <StyledCustomImage
                  src={image.imageUrl}
                  alt={image.imageAlt}
                  fill
                />
              </StyledImageWrapper>
              <Typography $size="sm" $color="black">
                {image.imageAlt}
              </Typography>
            </StyledImageCard>
          );
        })}
      </StyledImageGrid>
    </>
  );
};
export default TiptapImageGrid;
