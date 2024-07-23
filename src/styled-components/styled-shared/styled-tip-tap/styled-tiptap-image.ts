"use client";
import styled from "styled-components";

export const StyledImageWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  aspect-ratio: 1/1;
  margin: 10px auto;
`;

export const StyledCustomImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  object-fit: contain;
`;

export const StyledImageCard = styled.div`
  padding: 5px;
  max-width: 310px;
  border-radius: ${(props) => props.theme.style.borderRadius};
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.primary[100]};
`;

export const StyledImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
