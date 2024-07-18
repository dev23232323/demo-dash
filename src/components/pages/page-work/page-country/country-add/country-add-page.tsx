"use client";
import { FC } from "react";
import Button from "@/components/UI/ui-button";
import {
  StyledFlexWrapper,
  StyledHeading,
  Typography,
} from "@/styled-components/styled-global";
import TextField from "@/components/UI/ui-text-field";
import TextArea from "@/components/UI/ui-textarea";
import { FBB_BannerPreview } from "./banner-preview";
import { useForm } from "react-hook-form";
import {
  AddCountrySchema,
  AddCountrySchemaType,
} from "@/utils/schemas/schema-add-country";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SelectWrapper,
  Select,
  SelectLabel,
  SelectOptions,
} from "@/components/UI/ui-select";
import { allCountries } from "./countries";
import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import axiosInstance from "@/utils/utils";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import Link from "next/link";
import { Plus } from "@/components/UI/ui-icons";

interface AddCountryPageProps {}

const AddCountryPage: FC<AddCountryPageProps> = ({}) => {
  const { mutate, isLoading } = useMutation<
    any,
    AxiosError<AxiosErrorResponse>,
    FormData
  >({
    mutationFn: (data: FormData) => {
      return axiosInstance.post(`/work/country/add`, data);
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
    onSuccess() {
      Swal.fire({
        title: "Success",
        html: `Successfully added new Country to the DB`,
        icon: "success",
      });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddCountrySchemaType>({
    resolver: zodResolver(AddCountrySchema),
  });

  function handleFormSubmit(data: AddCountrySchemaType) {
    const foreground = data.foreground[0];
    const background = data.background[0];
    const country = allCountries.find((c) => c.isoCode === data.countryCode)!;

    const fd = new FormData();

    fd.append("foreground", foreground);
    fd.append("background", background);
    fd.append("name", country.name);

    (Object.keys(data) as (keyof AddCountrySchemaType)[]).forEach((key) => {
      if (key !== "foreground" && key !== "background") {
        fd.append(key, data[key] as string);
      }
    });

    mutate(fd);
  }

  return (
    <section>
      <StyledFlexWrapper $justifyContent="space-between" $responsive={false}>
        <StyledHeading>Add a new country</StyledHeading>
        <Link href={"/work/add"}>
          <Button size="sm" icon={Plus}>
            Work
          </Button>
        </Link>
      </StyledFlexWrapper>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <StyledFlexWrapper $alignItems="baseline">
          <TextField
            label="Title"
            description="This will show as the title of the banner"
            {...register("title")}
            error={errors.title?.message}
          />
          <SelectWrapper>
            {/* // I am using react hook form for this and this country variable have two things name and isoCode not I want both the value to be set in the zod schema as name and country Code */}
            <SelectLabel>Country</SelectLabel>
            <Select defaultValue={"AF"} {...register("countryCode")}>
              {allCountries.map((country) => (
                <SelectOptions value={country.isoCode} key={country.isoCode}>
                  {country.name}
                </SelectOptions>
              ))}
            </Select>
            <Typography $color="danger" $size="sm">
              {errors.countryCode?.message}
            </Typography>
          </SelectWrapper>
        </StyledFlexWrapper>

        <StyledFlexWrapper>
          <TextField
            label="Background Image"
            type="file"
            description="This will be the background image of the banner"
            {...register("background")}
            error={errors.background?.message as string}
          />
          <TextField
            label="Foreground Image"
            type="file"
            description="This will be the foreground image"
            {...register("foreground")}
            error={errors.foreground?.message as string}
          />
        </StyledFlexWrapper>
        <TextArea
          label="Description"
          description="This will show below the title"
          {...register("description")}
          error={errors.description?.message}
        />
        <Button type="submit" size="full" loading={isLoading}>
          Submit
        </Button>
      </form>
      <FBB_BannerPreview {...watch()} />
    </section>
  );
};

export default AddCountryPage;
