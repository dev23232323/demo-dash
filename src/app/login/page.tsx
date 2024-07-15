import LoginForm from "@/components/pages/page-login/login-form";
import { StyledLoginWrapper } from "@/styled-components/styled-pages/styled-login";
import { FC } from "react";

interface PageProps {}
const Page: FC<PageProps> = ({}) => {
  return (
    <StyledLoginWrapper>
      <LoginForm />
    </StyledLoginWrapper>
  );
};
export default Page;
