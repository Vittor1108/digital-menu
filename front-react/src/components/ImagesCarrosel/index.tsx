import React from "react";
import { Container, position } from "@chakra-ui/react";
import image1 from "@assets/images/bell.png";
import image2 from "@assets/images/mail.png";

export const ImagesCarrosel = (): JSX.Element => {
  return (
    <>
      <Container maxW="100%" padding="0">
        <Container border="1px solid green" maxW="100%" position="relative">
          <img src={image1} alt="" style={{border: "1px solid red", width: "100%", objectFit: "contain", maxWidth: "100%", position: "absolute"}}/>
          <img src={image2} alt="" style={{border: "1px solid red", width: "100%", objectFit: "contain", maxWidth: "100%", position: "absolute"}}/>
        </Container>
        <Container></Container>
      </Container>
    </>
  );
};
