import styled from "styled-components";

interface IProps {
  select: boolean;
}

export const ThumbImagesList = styled.ul`
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1rem 0;
  overflow-x: scroll;
`;

export const ItemThumbLIst = styled.li<IProps>`
  margin: 0 5px;
  img {
    object-fit: cover;
    height: 100px;
    width: 100px;
    opacity: ${(props) => (props.select ? "1" : "0.3")};
    border-bottom: ${(props) => (props.select ? "" : "1px solid white")};
    border: ${(props) => (props.select ? "1px solid white" : "")};
    transition: all 0.3s;
    &:hover {
      opacity: 1;
      border: 1.4px solid white;
    }
    cursor: pointer;
  }
`;

export const ImagesThumb = styled.img<IProps>`
  object-fit: contain;
  max-width: 100%;
  position: absolute;
  height: 100%;
  transform: ${(props) =>
    props.select ? "translateX(0)" : "translateX(-200%)"};
  transition: transform 0.3s;
`;
