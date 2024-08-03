"use client";
import { FC, useState } from "react";

// Styled
import {
  StyledUserInfo,
  StyledUserHeaderWrapper,
  StyledUserProfilePic,
  StyledUsersAccordionListWrapper,
} from "@/styled-components/styled-pages/styled-user/styled-users-list";

import { Accordion } from "@/components/UI/ui-accordion";
import { UserAccordionDetails } from "./user-accordion-details";
import { Typography } from "@/styled-components/styled-global";
import { PartialUser } from "@/@types/backend/user.type";

interface UsersAccordionListProps {
  users: PartialUser[];
}

export const UsersAccordionList: FC<UsersAccordionListProps> = ({ users }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState<string | null>(null);

  return (
    <StyledUsersAccordionListWrapper>
      {users.map((user, i) => {
        const isOpen = isAccordionOpen === String(i);
        return (
          <Accordion
            key={i}
            id={String(i)}
            setIsOpenAccordion={setIsAccordionOpen}
            isOpenAccordion={isOpen}
            accordion_header={() => <AccordionHeader user={user} />}
            accordion_content={() => <UserAccordionDetails data={user} />}
          />
        );
      })}
    </StyledUsersAccordionListWrapper>
  );
};

const AccordionHeader = ({ user }: { user: PartialUser }) => {
  return (
    <StyledUserHeaderWrapper href={`/u/?user=${user.id}`}>
      <StyledUserProfilePic
        src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.firstName}`}
        alt={`${user.firstName} ${user.lastName}'s profile picture`}
      />
      <StyledUserInfo>
        <Typography>{user.firstName}</Typography>
        <Typography $size="sm">{user.email}</Typography>
      </StyledUserInfo>
    </StyledUserHeaderWrapper>
  );
};
