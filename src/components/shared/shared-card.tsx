import { Button } from "@/components/UI/ui-button";
import { PencilLine, Trash } from "@/components/UI/ui-icons";
import Card, {
  CardContent,
  CardDescription,
  CardFooter,
  CardTypography,
} from "@/components/UI/ui-card";
import { FC } from "react";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { StyledFlexWrapper } from "@/styled-components/styled-global";
import Link from "next/link";
import axiosInstance from "@/utils/utils";
import Swal from "sweetalert2";

interface SharedCardProps {
  id: string;
  imageUrl: string;
  imageAlt?: string;
  title: string;
  shortDesc: string;
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult>;
  deleteUrl: string;
  updateUrl: string;
}

export const SharedCard: FC<SharedCardProps> = ({
  imageUrl,
  title,
  imageAlt,
  deleteUrl,
  refetch,
  shortDesc,
  id,
  updateUrl,
}) => {
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
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
      Swal.fire("Error!", "There was an error deleting your item.", "error");
    }
  };

  return (
    <Card imageUrl={imageUrl} imageAlt={imageAlt}>
      <CardContent>
        <CardTypography>{title}</CardTypography>
        <CardDescription>{shortDesc}</CardDescription>
      </CardContent>
      <CardFooter>
        <StyledFlexWrapper $responsive={false} $justifyContent="flex-end">
          <Button
            icon={Trash}
            iconAlign="end"
            onClick={handleDelete}
            variant="danger"
          >
            Delete
          </Button>
          <Link href={updateUrl}>
            <Button icon={PencilLine} iconAlign="end">
              Update
            </Button>
          </Link>
        </StyledFlexWrapper>
      </CardFooter>
    </Card>
  );
};
