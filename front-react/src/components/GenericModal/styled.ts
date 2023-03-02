import styled from "styled-components";

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  article {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    
    div{
      margin-bottom: 15px;
      text-align: center;
    }

    img{
      margin: 0 auto;
      max-width: 70px;
    }

    h1{
      margin-bottom: 10px;
      font-size: 24px;
    }

    p{
      font-size: 14px;
    }
  }
`;
