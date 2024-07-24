import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface AuthSlice {
  id: string | null;
  email: string | null;
  role: "admin" | null;
}

const initialState: AuthSlice = {
  email: null,
  id: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<AuthSlice>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.email = null;
      state.id = null;
      state.role = null;

      localStorage.removeItem("token");
    },
  },
});

export const validateLogin = (token: string) => async (dispatch: any) => {
  const response: AxiosResponse<AuthSlice> = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/auth/validate-user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  localStorage.setItem("token", token);
  dispatch(setData({ ...response.data }));
};

export const { setData, logout } = authSlice.actions;
export default authSlice.reducer;
