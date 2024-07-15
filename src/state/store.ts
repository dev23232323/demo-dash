import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./state-auth/auth-slice";
import imageReducer from "./state-tiptap-image/image-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    image: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
