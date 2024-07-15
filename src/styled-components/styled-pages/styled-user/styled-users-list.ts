"use client";
import Select from "@/components/UI/ui-select";
import Link from "next/link";
import styled from "styled-components";

// User List Page
export const StyledUserListFilterWrapper = styled.div`
  border-radius: ${(props) => props.theme.style.borderRadius};
  overflow: hidden;
  margin-top: 15px;
`;

// User accordion/user list
export const StyledUsersAccordionListWrapper = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background-color: ${(props) => props.theme.colors.primary[700]};
`;

export const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledUserHeaderWrapper = styled(Link)`
  display: flex;
  gap: 10px;
`;

export const StyledUserProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

// Accordion Details
export const StyledUserAccordionDetail = styled.div`
  background-color: ${(props) => props.theme.colors.primary[600]};
  transition: all ease-in-out 0.2s;
  padding: 20px 10px;
  height: 100%;
  opacity: 1;
  transform: translateY(-5px);

  border-bottom-right-radius: ${(props) => props.theme.style.borderRadius};
  border-bottom-left-radius: ${(props) => props.theme.style.borderRadius};
`;

// Header for filter
export const StyledFiltersHeader = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};

  padding: 10px 15px;
  font-weight: ${(props) => props.theme.fonts.weight.bold};

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledFilterSelect = styled(Select)`
  margin: 0;
  width: fit-content;
`;
