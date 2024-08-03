"use client";
import TextFiled from "@/components/UI/ui-text-field";

import {
  StyledUserDetailInputWrapper,
  StyledUserDetailsWrapper,
} from "@/styled-components/styled-pages/styled-user/styled-user-details";
import { StyledHeading } from "@/styled-components/styled-global";
import { FC } from "react";
import axiosInstance from "@/utils/utils";
import { useQuery } from "react-query";
import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import { AxiosError } from "axios";
import Button from "@/components/UI/ui-button";
import { Chevron_Left } from "@/components/UI/ui-icons";
import { useRouter } from "next/navigation";

const fetchUserDetails = async (userId: string) => {
  const response = await axiosInstance.get(`/user/get-user/${userId}`);
  return response.data;
};

interface UserDetailsProps {
  userId: string;
}

export const UserDetails: FC<UserDetailsProps> = ({ userId }) => {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<
    any,
    AxiosError<AxiosErrorResponse>
  >(
    ["userDetails", userId],
    () => fetchUserDetails(userId),

    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity, // Cache the data infinitely
      cacheTime: Infinity, // Don't remove from cache
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        Error: {error.response?.data.message || "Something went wrong!"}
      </div>
    );

  return (
    <StyledUserDetailsWrapper>
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        title="Go Back"
      >
        <Chevron_Left />
      </Button>
      <StyledUserDetailsWrapper $gap="10px">
        <StyledHeading>User Details</StyledHeading>
        <StyledUserDetailInputWrapper>
          {Object.entries(data).map(([key, value]) => (
            <TextFiled
              key={`${key}-${value}`}
              value={value as any}
              label={key}
              disabled
              aria-disabled
              styles={{
                label: {
                  color: "#000",
                },
              }}
            />
          ))}
        </StyledUserDetailInputWrapper>
      </StyledUserDetailsWrapper>
    </StyledUserDetailsWrapper>
  );
};

export default UserDetails;
