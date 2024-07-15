import { logout, validateLogin } from "@/state/state-auth/auth-slice";
import { RootState } from "@/state/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> =
    useDispatch();

  useEffect(() => {
    const validateUser = async () => {
      const storageToken = localStorage.getItem("token");

      if (!storageToken) {
        dispatch(logout());
        router.replace("/login");
      } else {
        try {
          await dispatch(validateLogin(storageToken));
        } catch (error) {
          console.error("User validation failed:", error);
          dispatch(logout());
          router.replace("/login");
        }
      }
    };

    validateUser();
  }, []);

  return children;
};

export default AuthProvider;
