import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageSlice {
  imageUrl: string;
  imageAlt: string;
}

const initialState: ImageSlice[] = [];

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<ImageSlice>) => {
      state.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<ImageSlice>) => {
      return state.filter(
        (image) =>
          image.imageUrl !== action.payload.imageUrl ||
          image.imageAlt !== action.payload.imageAlt
      );
    },
    listImages: (state) => {
      return state;
    },
  },
});

export const { addImage, removeImage } = imageSlice.actions;
export default imageSlice.reducer;
