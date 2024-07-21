"use client";
import { FC } from "react";
import { AddWorkSchemaType } from "@/utils/schemas/schema-work";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import axiosInstance from "@/utils/utils";
import Swal from "sweetalert2";
import WorkForm from "./work-form";
import { useRouter } from "next/navigation";

interface WorkAddPageProps {}
const WorkAddPage: FC<WorkAddPageProps> = ({}) => {
  const router = useRouter();

  const { isLoading, mutate } = useMutation<
    any,
    AxiosError<AxiosErrorResponse>,
    FormData
  >({
    mutationFn: (data: FormData) => {
      return axiosInstance.post(`/work/create`, data);
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
        text: "Blog uploaded successfully",
        icon: "success",
      });
      router.push("/blog");
    },
  });

  const formSubmit = (values: AddWorkSchemaType) => {
    const file = values.file[0];
    const fd = new FormData();
    fd.append("file", file);

    (Object.keys(values) as (keyof AddWorkSchemaType)[]).forEach((key) => {
      if (key !== "file") {
        fd.append(key, values[key] as string);
      }
    });

    mutate(fd);
  };

  return (
    <WorkForm isLoading={isLoading} onSubmit={formSubmit} formType="create" />
  );
};
export default WorkAddPage;
