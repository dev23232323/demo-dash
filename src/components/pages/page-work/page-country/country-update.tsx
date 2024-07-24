"use client";
import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/utils/utils";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import { AxiosError } from "axios";
import { UpdateCountrySchemaType } from "@/utils/schemas/schema-country";
import CountryForm from "./country-form";
import { CountryType } from "@/@types/backend/work.types";

interface CountryUpdatePageProps {}

const CountryUpdatePage: FC<CountryUpdatePageProps> = ({}) => {
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  const [defaultValues, setDefaultValues] = useState<CountryType | undefined>(
    undefined
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      Swal.fire("Error!", "Work id is missing!", "error");
      router.push("/work/country");
      return;
    }

    axiosInstance
      .get(`/work/country/get-country?id=${id}`)
      .then((response) => {
        setDefaultValues(response.data);
        setLoading(false); // Set loading to false after data is fetched
        router.refresh();
      })
      .catch((error) => {
        Swal.fire("Error!", "Failed to fetch work data!", "error");
        router.push("/work/country");
      });
  }, [id, router]);

  const { isLoading, mutate } = useMutation<
    any,
    AxiosError<AxiosErrorResponse>,
    FormData
  >({
    mutationFn: (data: FormData) => {
      return axiosInstance.put(`/work/country/update/${id}`, data);
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
    async onSuccess() {
      Swal.fire({
        title: "Success",
        text: "Work updated successfully",
        icon: "success",
      });
      //   router.push("/blog");
    },
  });

  function handleFormSubmit(values: UpdateCountrySchemaType) {
    const foreground = values.foreground[0];
    const background = values.background[0];

    const fd = new FormData();

    fd.append("foreground", foreground);
    fd.append("background", background);

    fd.append("old_bannerImageName", defaultValues?.bannerImageName || "");
    fd.append("old_overlayImageName", defaultValues?.overlayImageName || "");

    (Object.keys(values) as (keyof UpdateCountrySchemaType)[]).forEach(
      (key) => {
        if (key !== "foreground" && key !== "background") {
          fd.append(key, values[key] as string);
        }
      }
    );

    mutate(fd);
  }

  return (
    <CountryForm
      formType="update"
      isLoading={isLoading || loading}
      onSubmit={handleFormSubmit}
      defaultValues={defaultValues}
    />
  );
};
export default CountryUpdatePage;
