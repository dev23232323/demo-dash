"use client";
import UserDetailsComponent from "@/components/pages/page-users/user-details";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, Suspense } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const searchParam = useSearchParams();
  const userId = searchParam.get("user");
  const { back } = useRouter();

  if (!userId) {
    back();
    return null;
  }

  return <UserDetailsComponent userId={userId} />;
};

//* this is important if not wrapped in Suspense it will give a build time error
const ExportPage = () => {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
};

export default ExportPage;
