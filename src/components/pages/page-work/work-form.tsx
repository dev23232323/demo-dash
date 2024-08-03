"use client";
import TipTap from "@/components/shared/shared-tip-tap";
import {
  Select,
  SelectLabel,
  SelectOptions,
  SelectWrapper,
} from "@/components/UI/ui-select";
import TextFiled from "@/components/UI/ui-text-field";
import { StyledWorkWrapper } from "@/styled-components/styled-pages/styled-work";
import {
  StyledFlexWrapper,
  StyledHeading,
  Typography,
} from "@/styled-components/styled-global";
import { FC, useEffect } from "react";
import Button from "@/components/UI/ui-button";
import { Plus } from "@/components/UI/ui-icons";
import Link from "next/link";
import useCountries from "@/hooks/hook-country";
import { Controller, useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddWorkSchema,
  AddWorkSchemaType,
  UpdateWorkSchema,
  UpdateWorkSchemaType,
} from "@/utils/schemas/schema-work";

interface WorkAddPageProps {
  onSubmit: (values: any) => void;
  isLoading: boolean;
  defaultValues?: UpdateWorkSchemaType;
  formType: "update" | "create";
}

// Type guard to check if errors contain country
function hasCountryError(
  errors: FieldErrors<AddWorkSchemaType | UpdateWorkSchemaType>
): errors is FieldErrors<AddWorkSchemaType> {
  return "country" in errors;
}

const WorkForm: FC<WorkAddPageProps> = ({
  isLoading,
  onSubmit,
  defaultValues,
  formType,
}) => {
  const countries = useCountries();

  const schema = formType === "update" ? UpdateWorkSchema : AddWorkSchema;

  const formMethods = useForm<AddWorkSchemaType | UpdateWorkSchemaType>({
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
    <StyledWorkWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper $justifyContent="space-between" $responsive={false}>
          <StyledHeading>
            {formType === "update" ? "Update work" : "Add a new work"}
          </StyledHeading>
          <Link href={"/work/country/add"}>
            <Button icon={Plus} size="sm" iconAlign="end">
              Country
            </Button>
          </Link>
        </StyledFlexWrapper>
        <TextFiled
          label="Title"
          description="Title of the work"
          {...register("title")}
          error={errors.title?.message}
        />
        <TextFiled
          label="Slug"
          description="Slug for the page"
          {...register("slug")}
          error={errors.slug?.message}
        />
        <StyledFlexWrapper
          $alignItems="baseline"
          $margin={{ $marginBottom: "20px" }}
        >
          <TextFiled
            type="file"
            label="Blog thumbnail"
            description="The thumbnail of the blog / Cover Image"
            {...register("file")}
            error={errors.file?.message as string}
          />

          {formType === "create" && (
            <SelectWrapper>
              <SelectLabel>Country</SelectLabel>
              <Select {...register("country")}>
                <SelectOptions hidden aria-hidden>
                  Select Country
                </SelectOptions>
                {countries &&
                  countries.map((country) => (
                    <SelectOptions
                      key={country.countryCode}
                      value={country.countryCode}
                    >
                      {country.name}
                    </SelectOptions>
                  ))}
              </Select>
              {hasCountryError(errors) && (
                <Typography $color={errors.country ? "danger" : undefined}>
                  {errors.country?.message}
                </Typography>
              )}
            </SelectWrapper>
          )}
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
        <Button size="full" loading={isLoading}>
          {formType === "update" ? "Update Work" : "Post Work"}
        </Button>
      </form>
    </StyledWorkWrapper>
  );
};
export default WorkForm;
