import CountryUpdatePage from "@/components/pages/page-work/page-country/country-update";
import { FC, Suspense } from "react";

interface PageProps {}
const Page: FC<PageProps> = ({}) => {
  return (
    <Suspense>
      <CountryUpdatePage />
    </Suspense>
  );
};
export default Page;
