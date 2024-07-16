"use client";
import Button from "@/components/UI/ui-button";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@/components/UI/ui-modal";
import TextField from "@/components/UI/ui-text-field";
import { FC, useEffect, useRef, useState } from "react";
import {
  StyledCustomImage,
  StyledImageWrapper,
} from "@/styled-components/styled-shared/styled-tip-tap/styled-tiptap-image";
import {
  StyledFlexWrapper,
  Typography,
} from "@/styled-components/styled-global";
import { useDispatch } from "react-redux";
import { addImage } from "@/state/state-tiptap-image/image-slice";
import { handleFile, ImageHookForm } from "./tiptap-image-util";
import { Editor } from "@tiptap/react";

interface ImageAddModalProps extends Omit<ModalProps, "children"> {
  editor: Editor;
}

const ImageAddModal: FC<ImageAddModalProps> = ({ editor, ...props }) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [baseUrl, setBaseUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    },
    mutate: { isLoading },
    submitFunc,
  } = ImageHookForm({
    onError(error) {
      setError(error.response?.data.message || null);
    },
    onSuccess(e) {
      const data = e.data;
      dispatch(addImage({ imageAlt: data.altText, imageUrl: data.imageUrl }));
      editor
        .chain()
        .focus()
        .setImage({ src: data.imageUrl, alt: data.altText })
        .run();
      props.onClose();
    },
  });

  useEffect(() => {
    setBaseUrl(null);
    setError(null);
    reset();
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }, [props.open, reset]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFile({
      e,
      onError() {
        setError("Please select only an image");
      },
      onSuccess(file, base) {
        setValue("image", file);
        setBaseUrl(base);
      },
    });
  }

  return (
    <Modal {...props}>
      <ModalHeader>Add Image Details</ModalHeader>
      <ModalBody>
        <StyledImageWrapper>
          {baseUrl && <StyledCustomImage src={baseUrl} fill alt="nothing" />}
        </StyledImageWrapper>

        <form>
          <StyledFlexWrapper
            $responsive={false}
            $gap="15px"
            $flexDirection="column"
            $alignItems="start"
          >
            <TextField
              type="file"
              {...register("image")}
              ref={imageInputRef}
              onChange={handleImageChange}
              error={errors.image?.message as string}
              accept="image/*"
            />
            <TextField
              label="Alt"
              error={errors.alt?.message}
              {...register("alt")}
            />

            <Button
              role="button"
              type="button"
              loading={isLoading}
              onClick={handleSubmit(submitFunc)}
            >
              Upload
            </Button>
          </StyledFlexWrapper>
        </form>
      </ModalBody>
      {error && (
        <>
          <Typography>Error while uploading the image</Typography>
          <Typography $color="danger">{error}</Typography>
        </>
      )}
      <ModalFooter>
        <Button
          role="button"
          type="button"
          onClick={!isLoading ? props.onClose : () => null}
          loading={isLoading}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImageAddModal;
