"use client";
import TipTap from "@/components/shared/shared-tip-tap";
import { Button } from "@/components/UI/ui-button";
import TextFiled from "@/components/UI/ui-text-field";
import { StyledAddBlogWrapper } from "@/styled-components/styled-pages/styled-blog/styled-add-blog";
import {
  StyledFlexWrapper,
  StyledHeading,
} from "@/styled-components/styled-global";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AddBlogSchema, AddBlogSchemaType } from "@/utils/schemas/schema-blog";
import { Chevron_Left } from "@/components/UI/ui-icons";
import axiosInstance from "@/utils/utils";
import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import Swal from "sweetalert2";

interface AddBlogProps {}

export const AddBlog: FC<AddBlogProps> = ({}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<AddBlogSchemaType>({
    resolver: zodResolver(AddBlogSchema),
  });

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
      reset();
      Swal.fire({
        title: "Success",
        text: "Blog uploaded successfully",
        icon: "success",
      });
    },
  });

  const formSubmit = (values: AddBlogSchemaType) => {
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
    <StyledAddBlogWrapper>
      <StyledAddBlogWrapper $gap="40px">
        <Button onClick={() => router.back()} size="sm" icon={Chevron_Left}>
          Back
        </Button>
        <StyledHeading>Create a new Blog</StyledHeading>
        <form onSubmit={handleSubmit(formSubmit)}>
          <TextFiled
            label="Blog Title"
            description="Title of the blog"
            {...register("title")}
            error={errors.title?.message}
          />
          <StyledFlexWrapper>
            <TextFiled
              type="file"
              label="Blog thumbnail"
              description="The thumbnail of the blog / Cover Image"
              {...register("file")}
              error={errors.file?.message as string}
            />
            <TextFiled
              label="Slug"
              description="This text will appear in the url"
              {...register("slug")}
              error={errors.slug?.message}
            />
          </StyledFlexWrapper>
          <Controller
            name="html"
            control={control}
            render={({ field }) => (
              <TipTap
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.html?.message}
              />
            )}
          />
          <Button loading={isLoading} size="full">
            Post Blog
          </Button>
        </form>
      </StyledAddBlogWrapper>
    </StyledAddBlogWrapper>
  );
};

export default AddBlog;
