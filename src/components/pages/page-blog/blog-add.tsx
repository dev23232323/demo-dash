"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { BlogForm } from "./blog-form";
import { AddBlogSchemaType } from "@/utils/schemas/schema-blog";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import axiosInstance from "@/utils/utils";
import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import { AxiosError } from "axios";

interface AddBlogProps {}

const AddBlog: FC<AddBlogProps> = ({}) => {
  const router = useRouter();

  const { isLoading, mutate } = useMutation<
    any,
    AxiosError<AxiosErrorResponse>,
    FormData
  >({
    mutationFn: (data: FormData) => {
      return axiosInstance.post(`/blog/create`, data);
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

  const handleSubmit = (values: AddBlogSchemaType) => {
    const file = values.file[0];
    const fd = new FormData();
    fd.append("file", file);

    (Object.keys(values) as (keyof AddBlogSchemaType)[]).forEach((key) => {
      if (key !== "file") {
        fd.append(key, values[key] as string);
      }
    });

    mutate(fd);
  };

  return (
    <div>
      <BlogForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        formType="create"
      />
    </div>
  );
};

export default AddBlog;
