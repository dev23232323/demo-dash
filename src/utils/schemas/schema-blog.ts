import * as z from "zod";

export const BaseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  html: z.string().min(5, "HTML content must be at least 5 characters long"),
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
  file: z.any(),
});

export type BaseSchemaType = z.infer<typeof BaseSchema>;

export const AddBlogSchema = BaseSchema.extend({
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
});

export type AddBlogSchemaType = z.infer<typeof AddBlogSchema>;

export const UpdateBlogSchema = BaseSchema.extend({
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

export type UpdateBlogSchemaType = z.infer<typeof UpdateBlogSchema>;
