"use client";
import { FC, useEffect } from "react";
import Button from "@/components/UI/ui-button";
import {
  StyledFlexWrapper,
  StyledHeading,
  Typography,
} from "@/styled-components/styled-global";
import TextField from "@/components/UI/ui-text-field";
import TextArea from "@/components/UI/ui-textarea";
import { FBB_BannerPreview } from "./country-add/banner-preview";
import {
  SelectWrapper,
  Select,
  SelectLabel,
  SelectOptions,
} from "@/components/UI/ui-select";
import { allCountries } from "./country-add/countries";
import Link from "next/link";
import { Plus } from "@/components/UI/ui-icons";
import {
  AddCountrySchemaType,
  UpdateCountrySchema,
  UpdateCountrySchemaType,
} from "@/utils/schemas/schema-country";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Type guard to check if errors contain country
function hasCountryError(
  errors: FieldErrors<AddCountrySchemaType | UpdateCountrySchemaType>
): errors is FieldErrors<AddCountrySchemaType> {
  return "countryCode" in errors;
}

interface CountryFormProps {
  onSubmit: (values: AddCountrySchemaType | UpdateCountrySchemaType) => void;
  isLoading: boolean;
  defaultValues?: UpdateCountrySchemaType;
  formType: "update" | "create";
}

const CountryForm: FC<CountryFormProps> = ({
  formType,
  isLoading,
  onSubmit,
  defaultValues,
}) => {
  const schema =
    formType === "update" ? UpdateCountrySchema : UpdateCountrySchema;

  const formMethods = useForm<AddCountrySchemaType | UpdateCountrySchemaType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setFocus,
  } = formMethods;

  console.log(defaultValues);

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
    <section>
      <StyledFlexWrapper $justifyContent="space-between" $responsive={false}>
        <StyledHeading>Add a new country</StyledHeading>
        <Link href={"/work/add"}>
          <Button size="sm" icon={Plus}>
            Work
          </Button>
        </Link>
      </StyledFlexWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper $alignItems="baseline">
          <TextField
            label="Title"
            description="This will show as the title of the banner"
            {...register("title")}
            error={errors.title?.message}
          />
          {formType === "create" && (
            <SelectWrapper>
              <SelectLabel>Country</SelectLabel>
              <Select defaultValue={"AF"} {...register("countryCode")}>
                {allCountries.map((country) => (
                  <SelectOptions value={country.isoCode} key={country.isoCode}>
                    {country.name}
                  </SelectOptions>
                ))}
              </Select>
              {hasCountryError(errors) && (
                <Typography $color={errors.countryCode ? "danger" : undefined}>
                  {errors.countryCode?.message}
                </Typography>
              )}
            </SelectWrapper>
          )}
        </StyledFlexWrapper>

        <StyledFlexWrapper>
          <TextField
            label="Background Image"
            type="file"
            description="This will be the background image of the banner"
            {...register("background")}
            error={errors.background?.message as string}
          />
          <TextField
            label="Foreground Image"
            type="file"
            description="This will be the foreground image"
            {...register("foreground")}
            error={errors.foreground?.message as string}
          />
        </StyledFlexWrapper>
        <TextArea
          label="Description"
          description="This will show below the title"
          {...register("description")}
          error={errors.description?.message}
        />
        <Button size="full" loading={isLoading} type="submit">
          {formType === "update" ? "Update Country" : "Post Country"}
        </Button>
      </form>
      <FBB_BannerPreview {...watch()} {...defaultValues} />
    </section>
  );
};
export default CountryForm;
