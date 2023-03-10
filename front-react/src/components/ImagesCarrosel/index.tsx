import noImageIcon from "@assets/images/noImageIcon.png";
import { Container } from "@chakra-ui/react";
import React from "react";
import { ImagesThumb, ItemThumbLIst, ThumbImagesList } from "./styled";
export const ImagesCarrosel = ({
  images,
}: {
  images: Array<string>;
}): JSX.Element => {
  const [showImage, setShowImage] = React.useState<number>(0);

  return (
    <>
      <Container maxW="100%" padding="0" height="60vh" position="relative">
        <Container
          maxW="100%"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          border="1px solid black"
          overflow="hidden"
        >
          {!images.length && (
            <img
              src={noImageIcon}
              style={{
                objectFit: "cover",
              }}
            />
          )}
          {images.map((url: string, index: number) => {
            return (
              <ImagesThumb
                src={url}
                key={index}
                select={showImage === index ? true : false}
              />
            );
          })}
        </Container>
        {images.length > 0 && (
          <Container
            padding="0"
            position="absolute"
            bottom="0px"
            w="100%"
            maxW="100%"
          >
            <ThumbImagesList>
              {images.map((url: string, index: number) => {
                return (
                  <ItemThumbLIst
                    key={index}
                    select={showImage === index ? true : false}
                    onClick={() => setShowImage(index)}
                  >
                    <img src={url} />
                  </ItemThumbLIst>
                );
              })}
            </ThumbImagesList>
          </Container>
        )}
      </Container>
    </>
  );
};
