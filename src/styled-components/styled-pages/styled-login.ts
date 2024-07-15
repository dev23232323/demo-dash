"use client";
import styled from "styled-components";

export const StyledLoginWrapper = styled.section`
  width: 100vw;
  height: 100vh;

  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary[800]};
`;

export const StyledLoginFormWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  max-width: 400px;

  border-radius: ${(props) => props.theme.style.borderRadius};
  background-color: ${(props) => props.theme.colors.primary[500]};
`;

export const StyledLockIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary[900]};
  width: fit-content;

  margin: auto auto;
  padding: 20px;
  border-radius: 100%;
`;
