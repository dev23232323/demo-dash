import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import { LoginResponse } from "@/@types/type-api/login.types";
import { validateLogin } from "@/state/state-auth/auth-slice";
import { RootState } from "@/state/store";
import { LoginFormSchemaType } from "@/utils/schemas/schema-login-form";
import axiosInstance from "@/utils/utils";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export function useLoginMutate() {
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> =
    useDispatch();
  const router = useRouter();

  return useMutation<
    LoginResponse,
    AxiosError<AxiosErrorResponse>,
    LoginFormSchemaType
  >({
    mutationFn: (data: LoginFormSchemaType) => {
      return axiosInstance.post(`/auth/login`, data);
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
    async onSuccess(data, variables, __) {
      const token = data.data?.token;

      if (token) {
        try {
          await dispatch(validateLogin(token.token));
          Swal.fire({
            title: "Success",
            html: `Login successful for <br/> ${variables.email}`,
            icon: "success",
          });
          router.push("/");
        } catch (error) {
          console.log("the error is: ", error);

          Swal.fire({
            title: "Error!",
            text: "Something went wrong please try again",
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong please try again",
          icon: "error",
        });
      }
    },
  });
}
