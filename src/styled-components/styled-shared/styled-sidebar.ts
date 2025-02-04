"use client";
import { Button } from "@/components/UI/ui-button";
import { LogoSmall } from "@/components/UI/ui-icons";
import styled, { css } from "styled-components";

interface SideBarWrapperProps {
  $isClose?: boolean;
}

export const SideBarWrapper = styled.aside<SideBarWrapperProps>`
  padding: 40px 35px;
  background-color: ${(props) => props.theme.colors.primary[600]};
  min-height: 100%;
  min-width: 220px;

  scrollbar-gutter: stable;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  overflow-y: auto;

  #logo {
    font-size: 2.4rem;
    margin: auto;
    margin-bottom: 20px;
  }

  #links {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  transform: translateX(0);

  @media screen and (max-width: ${(props) => props.theme.sizes.md}) {
    position: absolute;

    transform: ${(props) => !props.$isClose && `translateX(-100%)`};
    transition: all ease-in-out 0.2s;
    width: 100%;
    z-index: 99;
  }
`;

export const StyledSidebarHeader = styled.div`
  display: flex;
  gap: 10px;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

export const StyledSmallLogo = styled(LogoSmall)`
  cursor: pointer;
  margin: 0 auto;
  margin-bottom: 10px;
  font-size: xx-large;
`;

export const StyledSidebarLinks = styled(Button)`
  white-space: nowrap;
  display: flex;
  justify-content: start;
  width: 100%;
  max-width: 100%;
`;

export const UserIconWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[500]};
  padding: 9px;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledExpandLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: hidden;

  border-radius: ${(props) => props.theme.style.borderRadius};
  background-color: ${({ theme }) => theme.colors.primary[400]};
`;

interface StyledExpandLinksProps {
  $isActive?: boolean;
}

export const StyledExpandLinkItems = styled(
  StyledSidebarLinks
)<StyledExpandLinksProps>`
  background-color: transparent;
  border-radius: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[700]};
  }

  ${({ $isActive }) => {
    if ($isActive) {
      return css`
        background-color: ${({ theme }) => theme.colors.primary[700]};
      `;
    }
  }}
`;
