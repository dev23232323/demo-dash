import TipTap from "@/components/shared/shared-tip-tap";
import { Button } from "@/components/UI/ui-button";
import TextFiled from "@/components/UI/ui-text-field";
import { StyledFlexWrapper } from "@/styled-components/styled-global";
import { FC, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddBlogSchema, AddBlogSchemaType } from "@/utils/schemas/schema-blog";
import {
  UpdateBlogSchema,
  UpdateBlogSchemaType,
} from "@/utils/schemas/schema-blog";

interface BlogFormProps {
  onSubmit: (values: AddBlogSchemaType | UpdateBlogSchemaType) => void;
  isLoading: boolean;
  defaultValues?: AddBlogSchemaType | UpdateBlogSchemaType;
  formType?: "update" | "create";
}

export const BlogForm: FC<BlogFormProps> = ({
  onSubmit,
  isLoading,
  defaultValues,
  formType = "create",
}) => {
  const schema = formType === "update" ? UpdateBlogSchema : AddBlogSchema;

  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setFocus,
  } = formMethods;

  useEffect(() => {
    if (defaultValues) {
      (Object.keys(defaultValues) as Array<keyof typeof defaultValues>).forEach(
        (key) => {
          setValue(key, defaultValues[key]);
          setFocus(key);
        }
      );
    }
  }, [defaultValues, setValue, setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFiled
        label="Blog Title"
        description="Title of the blog"
        {...register("title")}
        error={errors.title?.message}
      />
      <StyledFlexWrapper>
        <TextFiled
          type="file"
          label="Blog thumbnail"
          description="The thumbnail of the blog / Cover Image"
          {...register("file")}
          error={errors.file?.message as string}
        />
        <TextFiled
          label="Slug"
          description="This text will appear in the URL"
          {...register("slug")}
          error={errors.slug?.message}
        />
      </StyledFlexWrapper>
      <Controller
        name="html"
        control={control}
        render={({ field }) => (
          <TipTap
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.html?.message}
          />
        )}
      />
      <Button loading={isLoading} size="full">
        {formType === "update" ? "Update Blog" : "Post Blog"}
      </Button>
    </form>
  );
};
