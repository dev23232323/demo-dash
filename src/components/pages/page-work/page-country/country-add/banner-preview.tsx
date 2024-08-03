/*

 ! This component is the replica of https://freeblackboard.com/our-works don't change styles of this component unless it is changes there.

  * This is for showing a preview how it will look on the actual site
*/

"use client";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface FBB_BannerSectionProps {
  $backgroundImage: string;
}
const FBB_BannerSection = styled.section<FBB_BannerSectionProps>`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  position: relative;
  padding: 5em 0;
  overflow: hidden;
  margin-top: 5em;
  border-radius: 5px;
  border: 1px solid #000;

  * {
    z-index: 5;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.$backgroundImage});
    background-size: cover;
    background-position: center top;
    filter: blur(5px) brightness(75%);
    inset: 0px;
  }
`;

const FBB_BannerForegroundImage = styled.img`
  width: fit-content;
  max-width: 250px;
  border-radius: 100%;
`;

const FBB_BannerParagraph = styled.p`
  word-wrap: break-word;
`;

const FBB_BannerTitle = styled.header`
  font-weight: bolder;
  letter-spacing: 1px;
  font-size: 30px;
  font-family: Rubik, sans-serif !important;
`;

const FBB_BannerFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 55%;
  width: fit-content;
`;

const FBB_Toolbar = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  display: flex;
  gap: 5px;
`;

export interface FBB_BannerPreviewProps {
  title: string;
  description: string;
  background?: FileList;
  foreground?: FileList;
  bannerImageUrl?: string;
  overlayImageUrl?: string;
}

export const FBB_BannerPreview: FC<FBB_BannerPreviewProps> = ({
  background,
  description,
  foreground,
  title,
  bannerImageUrl,
  overlayImageUrl,
}) => {
  function getBase64Image(fileList: FileList): Promise<string> {
    return new Promise((resolve, reject) => {
      const file = fileList[0];
      if (!file) {
        return reject("No file found at index 0.");
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("Failed to convert file to base64.");
        }
      };
      reader.onerror = () => {
        reject("Error reading file.");
      };

      reader.readAsDataURL(file);
    });
  }

  const [images, setImages] = useState<{
    background: string;
    foreground: string;
  }>({
    background: bannerImageUrl || "",
    foreground: overlayImageUrl || "",
  });

  useEffect(() => {
    console.log("hehe", bannerImageUrl, overlayImageUrl);

    setImages((prev) => {
      return {
        ...prev,
        background: bannerImageUrl || "",
        foreground: overlayImageUrl || "",
      };
    });
  }, [bannerImageUrl, overlayImageUrl]);

  useEffect(() => {
    if (foreground && foreground.length > 0) {
      getBase64Image(foreground)
        .then((base64) =>
          setImages((prevImages) => ({
            ...prevImages,
            foreground: base64,
          }))
        )
        .catch((error) => {
          console.log(error, "error while setting image");
          setImages((prevImages) => ({
            ...prevImages,
            foreground: "",
          }));
        });
    }
    if (background && background.length > 0) {
      getBase64Image(background)
        .then((base64) =>
          setImages((prevImages) => ({
            ...prevImages,
            background: base64,
          }))
        )
        .catch((error) => {
          console.log(error, "error while setting image");
          setImages((prevImages) => ({
            ...prevImages,
            background: "",
          }));
        });
    }
  }, [background, foreground]);

  return (
    <FBB_BannerSection $backgroundImage={images.background}>
      <FBB_BannerFlexWrapper>
        <FBB_BannerTitle>{title}</FBB_BannerTitle>
        <FBB_BannerParagraph>{description}</FBB_BannerParagraph>
      </FBB_BannerFlexWrapper>
      <FBB_BannerForegroundImage src={images.foreground} alt="" />
    </FBB_BannerSection>
  );
};
