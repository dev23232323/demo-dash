"use client";
import { FC } from "react";
import { AddCountrySchemaType } from "@/utils/schemas/schema-country";
import { allCountries } from "./countries";
import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import axiosInstance from "@/utils/utils";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import CountryForm from "../country-form";

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
      } else {
        Swal.fire({
          title: "Error!",
          text: error.message,
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

  function handleFormSubmit(values: AddCountrySchemaType) {
    const foreground = values.foreground[0];
    const background = values.background[0];
    const country = allCountries.find((c) => c.isoCode === values.countryCode)!;

    const fd = new FormData();

    fd.append("foreground", foreground);
    fd.append("background", background);
    fd.append("name", country.name);

    (Object.keys(values) as (keyof AddCountrySchemaType)[]).forEach((key) => {
      if (key !== "foreground" && key !== "background") {
        fd.append(key, values[key] as string);
      }
    });

    mutate(fd);
  }

  return (
    <CountryForm
      formType="create"
      isLoading={isLoading}
      onSubmit={handleFormSubmit}
    />
  );
};

export default AddCountryPage;
