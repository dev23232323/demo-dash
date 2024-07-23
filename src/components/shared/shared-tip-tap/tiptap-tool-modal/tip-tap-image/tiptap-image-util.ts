import { AxiosErrorResponse } from "@/@types/type-api/common.types";
import {
  AddImageSchema,
  AddImageSchemaType,
} from "@/utils/schemas/schema-tiptap-image";
import axiosInstance, { getBase64Image } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

// * This function is responsible for returning all the necessary function and variables for form to work
export interface ImageHookFormProps {
  onSuccess?: (e: AxiosResponse<{ altText: string; imageUrl: string }>) => void;
  onError?: (error: AxiosError<AxiosErrorResponse, any>) => void;
}

export function ImageHookForm({ onError, onSuccess }: ImageHookFormProps) {
  const formProps = useForm<AddImageSchemaType>({
    resolver: zodResolver(AddImageSchema),
  });

  const { mutate, ...mutateProps } = useMutation<
    any,
    AxiosError<AxiosErrorResponse>,
    FormData
  >({
    mutationFn: (data: FormData) => {
      return axiosInstance.post(`/blog/image/upload`, data);
    },
    onError: async (error) => {
      onError && onError(error);
    },
    async onSuccess(e) {
      onSuccess && onSuccess(e);
    },
  });

  const formSubmit = (values: AddImageSchemaType) => {
    const fd = new FormData();
    fd.append("file", values.image);
    fd.append("alt", values.alt);
    mutate(fd);
  };

  return { form: formProps, mutate: mutateProps, submitFunc: formSubmit };
}

interface handleFileProps {
  e: React.ChangeEvent<HTMLInputElement>;
  onSuccess?: (file: File, base: string) => void;
  onError?: () => void;
}
export async function handleFile({ e, onError, onSuccess }: handleFileProps) {
  const file = e.target.files ? e.target.files[0] : null;
  if (file) {
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      const base = await getBase64Image(file);
      onSuccess && onSuccess(file, base);
    } else {
      onError && onError();
    }
  }
  return null;
}
