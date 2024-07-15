import UserDetailsComponent from "@/components/pages/page-users/user-details";
import { FC } from "react";

interface PageProps {
  params: {
    userId: string;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  return <UserDetailsComponent userId={params.userId} />;
};
export default Page;
