"use client";
import Button from "@/components/UI/ui-button";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@/components/UI/ui-modal";
import TextField from "@/components/UI/ui-text-field";
import { FC, useEffect } from "react";
import { StyledFlexWrapper } from "@/styled-components/styled-global";
import { useDispatch } from "react-redux";
import { Editor } from "@tiptap/react";
import {
  StyledCustomImage,
  StyledImageWrapper,
} from "@/styled-components/styled-shared/styled-tip-tap/styled-tiptap-image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImageUrlSchema,
  ImageUrlSchemaType,
} from "@/utils/schemas/schema-tiptap-image";
import { addImage } from "@/state/state-tiptap-image/image-slice";

interface ImageLinkModalProps extends Omit<ModalProps, "children"> {
  editor: Editor;
}

const ImageLinkModal: FC<ImageLinkModalProps> = ({ editor, ...props }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ImageUrlSchemaType>({
    resolver: zodResolver(ImageUrlSchema),
  });

  useEffect(() => {
    reset();
  }, [props.open, reset]);

  function handleFormSubmit(values: ImageUrlSchemaType) {
    dispatch(addImage({ imageAlt: values.alt, imageUrl: values.link }));
    editor
      .chain()
      .focus()
      .setImage({ src: values.link, alt: values.alt })
      .run();
    props.onClose();
  }

  return (
    <Modal {...props}>
      <ModalHeader>Add Image Details</ModalHeader>
      <ModalBody>
        <StyledImageWrapper>
          {getValues("link") && (
            <StyledCustomImage src={getValues("link")} alt="image" />
          )}
        </StyledImageWrapper>
        <form>
          <StyledFlexWrapper
            $responsive={false}
            $gap="15px"
            $flexDirection="column"
            $alignItems="start"
          >
            <TextField
              label="Image URL"
              error={errors.link?.message}
              {...register("link")}
            />
            <TextField
              label="Alt"
              error={errors.alt?.message}
              {...register("alt")}
            />

            <Button
              role="button"
              type="button"
              onClick={handleSubmit(handleFormSubmit)}
              size="full"
            >
              Add
            </Button>
          </StyledFlexWrapper>
        </form>
      </ModalBody>

      <ModalFooter>
        <Button role="button" type="button" onClick={props.onClose} size="full">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImageLinkModal;
