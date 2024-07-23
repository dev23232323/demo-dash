"use client";
import * as z from "zod";

export const BaseCountrySchema = z.object({
  title: z.string().min(5),
  description: z.string(),
  countryCode: z.string().min(2).max(2),
});

export const UpdateCountrySchema = BaseCountrySchema.extend({
  background:
    typeof window === "undefined"
      ? z.any()
      : z.instanceof(FileList).refine(
          (fileList) => {
            if (fileList.length === 0) return true; // Allow empty file list as it's optional
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
  foreground:
    typeof window === "undefined"
      ? z.any()
      : z.instanceof(FileList).refine(
          (fileList) => {
            if (fileList.length === 0) return true; // Allow empty file list as it's optional
            const file = fileList[0];
            if (file) {
              const fileType = file.type;
              return fileType.startsWith("image/");
            }
            return false;
          },
          {
            message: "Please select only an image file.",
          }
        ),
});

export const AddCountrySchema = BaseCountrySchema.extend({
  background:
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
  foreground:
    typeof window === "undefined"
      ? z.any()
      : z.instanceof(FileList).refine(
          (fileList) => {
            if (fileList.length === 0) return true; // Allow empty file list as it's optional
            const file = fileList[0];
            if (file) {
              const fileType = file.type;
              return fileType.startsWith("image/");
            }
            return false;
          },
          {
            message: "Please select only an image file.",
          }
        ),
  countryCode: z.z.string().max(2),
});

export type AddCountrySchemaType = z.infer<typeof AddCountrySchema>;
export type UpdateCountrySchemaType = z.infer<typeof UpdateCountrySchema>;
export type BaseCountrySchemaType = z.infer<typeof BaseCountrySchema>;
