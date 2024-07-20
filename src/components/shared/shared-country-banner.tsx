import { FC } from "react";
import {
  FBB_BannerPreview,
  FBB_BannerPreviewProps,
} from "../pages/page-work/page-country/country-add/banner-preview";
import Button from "../UI/ui-button";
import { PencilLine, Trash } from "../UI/ui-icons";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import {
  StyledBannerToolbar,
  StyledBannerToolbarWrapper,
} from "@/styled-components/styled-shared/styled-country-banner";
import Link from "next/link";
import Swal from "sweetalert2";
import axiosInstance from "@/utils/utils";
import { AxiosError } from "axios";

interface SharedCountryBannerProps extends FBB_BannerPreviewProps {
  deleteUrl: string;
  updateUrl: string;
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult>;
}

const SharedCountryBanner: FC<SharedCountryBannerProps> = ({
  deleteUrl,
  updateUrl,
  refetch,
  ...bannerProps
}) => {
  async function handleDelete() {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        html: "You won't be able to revert this! <br/> This will also delete all the works of this country",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosInstance.delete(deleteUrl);
        await Swal.fire("Deleted!", "Your item has been deleted.", "success");
        refetch();
      }
    } catch (error) {
      const err = error as AxiosError;
      Swal.fire(
        "Error!",
        `There was an error deleting your item. <br/> ${err.message}`,
        "error"
      );
      console.log("The error is: ", error);
    }
  }

  return (
    <StyledBannerToolbarWrapper>
      <FBB_BannerPreview {...bannerProps} />
      <StyledBannerToolbar>
        <Button
          size="sm"
          variant="danger"
          title="Delete country"
          onClick={handleDelete}
        >
          <Trash />
        </Button>
        <Link href={updateUrl}>
          <Button size="sm" title="Update Country Data">
            <PencilLine />
          </Button>
        </Link>
      </StyledBannerToolbar>
    </StyledBannerToolbarWrapper>
  );
};
export default SharedCountryBanner;
