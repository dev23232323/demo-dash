"use client";
import * as z from "zod";

export const BaseWorkSchema = z.object({
  title: z.string().min(5),
  file: z.any(),
  html: z.string().min(5),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-zA-Z0-9\s-]+$/, {
      message: "Slug can only contain letters, numbers, spaces, and hyphens",
    })
    .transform((val) =>
      val
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    ),
});

export const AddWorkSchema = BaseWorkSchema.extend({
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
  country: z.z.string().max(2),
});

export const UpdateWorkSchema = BaseWorkSchema.extend({
  file:
    typeof window === "undefined"
      ? z.any()
      : z.instanceof(FileList).refine(
          (fileList) => {
            const file = fileList[0];
            if (!file) {
              return true;
            } else if (file) {
              const fileType = file.type;
              if (fileType.startsWith("image/")) {
                return file;
              } else {
                return false;
              }
            }
          },
          {
            message: "Please select only an image file.",
          }
        ),
});

export type BaseWorkSchemaType = z.infer<typeof BaseWorkSchema>;
export type AddWorkSchemaType = z.infer<typeof AddWorkSchema>;
export type UpdateWorkSchemaType = z.infer<typeof UpdateWorkSchema>;
