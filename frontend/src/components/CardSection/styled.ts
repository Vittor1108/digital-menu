import styled from "styled-components";

export const Section = styled.section`
  width: 49%;
  background-color: white;
  box-shadow: 0 1px 6px 1px rgb(69 65 78 / 10%);
  height: 85vh;
  article {
    padding: 1.5rem;
  }

  @media screen and (max-width: 1199px){
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
  }
`;
