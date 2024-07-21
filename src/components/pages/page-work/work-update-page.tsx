"use client";
import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import WorkForm from "./work-form";
import { AddBlogSchemaType } from "@/utils/schemas/schema-blog";
import axiosInstance from "@/utils/utils";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import { AxiosError } from "axios";
import { Work } from "@/@types/backend/work.types";

interface WorkUpdatePageProps {}
const WorkUpdatePage: FC<WorkUpdatePageProps> = ({}) => {
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  const [defaultValues, setDefaultValues] = useState<Work | undefined>(
    undefined
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      Swal.fire("Error!", "Work id is missing!", "error");
      router.push("/work");
      return;
    }

    axiosInstance
      .get(`/work/get-work?id=${id}`)
      .then((response) => {
        setDefaultValues(response.data);
        setLoading(false); // Set loading to false after data is fetched
        router.refresh();
      })
      .catch((error) => {
        Swal.fire("Error!", "Failed to fetch work data!", "error");
        router.push("/work");
      });
  }, [id, router]);

  const { isLoading, mutate } = useMutation<
    any,
    AxiosError<AxiosErrorResponse>,
    FormData
  >({
    mutationFn: (data: FormData) => {
      return axiosInstance.put(`/work/update/${id}`, data);
    },
    onError: async (error) => {
      if (error.response) {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      }
    },
    async onSuccess() {
      Swal.fire({
        title: "Success",
        text: "Work updated successfully",
        icon: "success",
      });
      //   router.push("/blog");
    },
  });

  const handleSubmit = (values: AddBlogSchemaType) => {
    const file = values.file?.[0];
    const fd = new FormData();

    if (file) {
      fd.append("file", file);
    }

    (Object.keys(values) as (keyof AddBlogSchemaType)[]).forEach((key) => {
      if (key !== "file") {
        fd.append(key, values[key] as string);
      }
    });

    if (defaultValues) {
      fd.append("old_imageName", defaultValues.imageName);
    }

    mutate(fd);
  };

  return (
    <WorkForm
      formType="update"
      isLoading={isLoading || loading}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    />
  );
};
export default WorkUpdatePage;
