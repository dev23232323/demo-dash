"use client";
import * as z from "zod";

export const AddBlogSchema = z.object({
  title: z.string().min(5),
  file:
    typeof window === "undefined"
      ? z.any()
      : z.instanceof(FileList).refine(
          (fileList) => {
            const file = fileList[0];
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
  html: z.string().min(5),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Slug can only contain letters, numbers, and spaces",
    })
    .transform(
      (val) =>
        val
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/[^a-z0-9-]/g, "") // Remove non-URL-friendly characters
    ),
});

export type AddBlogSchemaType = z.infer<typeof AddBlogSchema>;
