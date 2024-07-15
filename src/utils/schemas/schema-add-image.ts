"use client";
import * as z from "zod";

export const AddImageSchema = z.object({
  alt: z.string().min(5).max(60),
  image: z.instanceof(File).refine(
    (file) => {
      if (file) {
        const fileType = file.type;
        if (fileType.startsWith("image/")) {
          return file;
        }
      }
      return false;
    },
    {
      message: "Please select only an image file.",
    }
  ),
});

export type AddImageSchemaType = z.infer<typeof AddImageSchema>;
