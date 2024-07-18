"use client";
import { useQuery } from "react-query";
import axiosInstance from "@/utils/utils";
import { useEffect, useState } from "react";
import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import Swal from "sweetalert2";
import { Country } from "@/@types/backend/work.types";

const fetchCountries = async () => {
  const { data } = await axiosInstance.get("/work/country/get-dropdown");
  return data;
};

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>();

  const { data, refetch, error } = useQuery<Country, AxiosErrorResponse>(
    "countries",
    () => fetchCountries(),
    {
      enabled: false, // Don't fetch on mount
    }
  );

  useEffect(() => {
    if (data) {
      const stringCountries = JSON.stringify(data);
      localStorage.setItem("countries", stringCountries);
    }
  }, [data]);

  useEffect(() => {
    const localCountries = localStorage.getItem("countries");
    if (localCountries) {
      const parsedLocalCountries = JSON.parse(localCountries);
      setCountries(parsedLocalCountries);
    }
  }, []);

  useEffect(() => {
    if (!countries) {
      refetch();
    }
  }, [countries, refetch]);

  if (error) {
    Swal.fire({
      icon: "error",
      html: "Something went wrong while fetching Country List",
    });
  }

  return countries;
};

export default useCountries;
