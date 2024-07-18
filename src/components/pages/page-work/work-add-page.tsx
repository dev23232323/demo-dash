"use client";
import TipTap from "@/components/shared/shared-tip-tap";
import {
  Select,
  SelectLabel,
  SelectOptions,
  SelectWrapper,
} from "@/components/UI/ui-select";
import TextFiled from "@/components/UI/ui-text-field";
import { StyledWorkWrapper } from "@/styled-components/styled-pages/styled-work";
import {
  StyledFlexWrapper,
  StyledHeading,
  Typography,
} from "@/styled-components/styled-global";
import { FC } from "react";
import Button from "@/components/UI/ui-button";
import { Plus } from "@/components/UI/ui-icons";
import Link from "next/link";
import useCountries from "@/hooks/hook-country";
import { Controller, useForm } from "react-hook-form";
import { AddWorkSchema, AddWorkSchemaType } from "@/utils/schemas/schema-work";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import axiosInstance from "@/utils/utils";
import Swal from "sweetalert2";

interface WorkAddPageProps {}
const WorkAddPage: FC<WorkAddPageProps> = ({}) => {
  const countries = useCountries();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<AddWorkSchemaType>({
    resolver: zodResolver(AddWorkSchema),
  });

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
      reset();
      Swal.fire({
        title: "Success",
        text: "Work added successfully",
        icon: "success",
      });
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
    <StyledWorkWrapper>
      <form onSubmit={handleSubmit(formSubmit)}>
        <StyledFlexWrapper $justifyContent="space-between" $responsive={false}>
          <StyledHeading>Add a new work</StyledHeading>
          <Link href={"/work/country/add"}>
            <Button icon={Plus} size="sm" iconAlign="end">
              Country
            </Button>
          </Link>
        </StyledFlexWrapper>
        <TextFiled
          label="Title"
          description="Title of the work"
          {...register("title")}
          error={errors.title?.message}
        />
        <TextFiled
          label="Slug"
          description="Slug for the page"
          {...register("slug")}
          error={errors.slug?.message}
        />
        <StyledFlexWrapper
          $alignItems="baseline"
          $margin={{ $marginBottom: "20px" }}
        >
          <TextFiled
            type="file"
            label="Blog thumbnail"
            description="The thumbnail of the blog / Cover Image"
            {...register("file")}
            error={errors.file?.message as string}
          />

          <SelectWrapper>
            <SelectLabel>Country</SelectLabel>
            <Select {...register("country")}>
              <SelectOptions hidden aria-hidden>
                Select Country
              </SelectOptions>
              {countries &&
                countries.map((country) => (
                  <SelectOptions
                    key={country.countryCode}
                    value={country.countryCode}
                  >
                    {country.name}
                  </SelectOptions>
                ))}
            </Select>
            <Typography $color={errors.country && "danger"}>
              {errors.country?.message}
            </Typography>
          </SelectWrapper>
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
        <Button size="full" loading={isLoading}>
          Submit
        </Button>
      </form>
    </StyledWorkWrapper>
  );
};
export default WorkAddPage;
