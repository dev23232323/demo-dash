"use client";
import { Button } from "@/components/UI/ui-button";
import { Lock, LoginIcon } from "@/components/UI/ui-icons";
import TextField from "@/components/UI/ui-text-field";
import {
  StyledLoginFormWrapper,
  StyledLockIconWrapper,
} from "@/styled-components/styled-pages/styled-login";
import { StyledHeading, Typography } from "@/styled-components/styled-global";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginFormSchema,
  LoginFormSchemaType,
} from "@/utils/schemas/schema-login-form";
import { useForm } from "react-hook-form";
import { useLoginMutate } from "./login-mutate";

interface PageProps {}
const LoginForm: FC<PageProps> = ({}) => {
  const { mutate, isLoading } = useLoginMutate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
  });

  return (
    <StyledLoginFormWrapper>
      <StyledLockIconWrapper>
        <Lock height={30} width={30} />
      </StyledLockIconWrapper>
      <div>
        <StyledHeading $textAlign="center">Sign In</StyledHeading>
        <Typography $textAlign="center" $isBold>
          Welcome to the Admin Dashboard
        </Typography>
        <Typography $textAlign="center">
          Manage and Oversee with Ease
        </Typography>
      </div>

      <form
        onSubmit={handleSubmit((data: LoginFormSchemaType) => mutate(data))}
      >
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          styles={{ root: { marginBottom: "30px" } }}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
          styles={{ root: { marginBottom: "30px" } }}
        />
        <Button
          loading={isLoading}
          size="full"
          icon={LoginIcon}
          iconAlign="end"
        >
          Login
        </Button>
      </form>
    </StyledLoginFormWrapper>
  );
};

export default LoginForm;
