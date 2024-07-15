"use client";
import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;

export const ModalContent = styled.div`
  background: ${(props) => props.theme.colors.primary[400]};
  padding: 20px;
  border-radius: 4px;
  max-width: ${(props) => props.theme.sizes.md};
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 100vh;
  overflow-y: scroll;
  scrollbar-width: thin;
  max-width: 95vw;
  text-overflow: wrap;
`;

export const ModalHeader = styled.header`
  font-size: ${(props) => props.theme.fonts.size.heading2};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary[900]};
  margin-bottom: 10px;
`;

export const ModalFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  margin-top: 10px;
`;

export const ModalBody = styled.div`
  margin: 10px auto;
`;
