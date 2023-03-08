import React from "react";
import { Container, position } from "@chakra-ui/react";
import image1 from "@assets/images/uploads/prato1.jpg";
import image2 from "@assets/images/uploads/prato2.jpg";

export const ImagesCarrosel = ({
  images,
}: {
  images: Array<string>;
}): JSX.Element => {
  
  return (
    <>
      <Container
        maxW="100%"
        padding="0"
        height="60vh"
        position="relative"
        border="1px solid green"
      >
        <Container
          border="1px solid green"
          maxW="100%"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <img
            src={images[0]}
            alt=""
            style={{
              objectFit: "cover",
              maxWidth: "100%",
              position: "absolute",
              height: "100%",
            }}
          />
          <img
            src={images[1]}
            alt=""
            style={{
              objectFit: "cover",
              maxWidth: "100%",
              position: "absolute",
              height: "100%",
            }}
          />
        </Container>
        <Container
          padding="0"
          position="absolute"
          bottom="0px"
          w="100%"
          maxW="100%"
        >
          <ul
            style={{
              bottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              padding: "1rem 0",
            }}
          >
            <li>
              <img
                src={images[0]}
                alt=""
                style={{
                  border: "10px solid transparent",
                  objectFit: "contain",
                  maxWidth: "100%",
                  height: "100px",
                  cursor: "pointer",
                  opacity: "0.4",
                  borderBottom: "1px solid white",
                }}
              />
            </li>
            <li>
              <img
                src={images[1]}
                alt=""
                style={{
                  border: "10px solid transparent",
                  outline: "1px solid white",
                  objectFit: "contain",
                  height: "100px",
                  maxWidth: "100%",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              />
            </li>
          </ul>
        </Container>
      </Container>
    </>
  );
};
