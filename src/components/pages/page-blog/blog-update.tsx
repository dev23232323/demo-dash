"use client";
import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogForm } from "./blog-form";
import { AddBlogSchemaType } from "@/utils/schemas/schema-blog";
import axiosInstance from "@/utils/utils";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import { AxiosError } from "axios";
import { Blog } from "@/@types/backend/blog.type";

interface BlogUpdateProps {}

const BlogUpdate: FC<BlogUpdateProps> = ({}) => {
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  const [defaultValues, setDefaultValues] = useState<Blog | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status

  useEffect(() => {
    if (!id) {
      Swal.fire("Error!", "Blog id is missing!", "error");
      router.push("/blog");
      return;
    }

    axiosInstance
      .get(`/blog/get-blog?id=${id}`)
      .then((response) => {
        setDefaultValues(response.data);
        setLoading(false); // Set loading to false after data is fetched
        router.refresh();
      })
      .catch((error) => {
        Swal.fire("Error!", "Failed to fetch blog data!", "error");
        router.push("/blog");
      });
  }, [id, router]);

  const { isLoading, mutate } = useMutation<
    any,
    AxiosError<AxiosErrorResponse>,
    FormData
  >({
    mutationFn: (data: FormData) => {
      return axiosInstance.put(`/blog/update/${id}`, data);
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
        text: "Blog updated successfully",
        icon: "success",
      });
      router.push("/blog");
    },
  });

  const handleSubmit = (values: AddBlogSchemaType) => {
    const file = values.file?.[0];
    const fd = new FormData();

    console.log(values);

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
    <div>
      <BlogForm
        onSubmit={handleSubmit}
        isLoading={isLoading || loading}
        defaultValues={defaultValues}
        formType="update"
      />
    </div>
  );
};

export default BlogUpdate;
