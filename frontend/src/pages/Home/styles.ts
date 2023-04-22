import styled from "styled-components";

interface IProps {
  color: string;
}

export const CardInfo = styled.article<IProps>`
  flex: 1;
  background-color: white;
  margin-right: 28px;
  box-shadow: 0 1px 6px 1px rgba(69, 65, 78, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px;

  &:last-child {
    margin-right: 0;
  }

  div {
    &:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;

      p {
        font-weight: bold;
        font-size: 14px;
      }

      span {
        background-color: ${(props) => props.color};
        color: white;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 0.25rem 0.75rem;
        border-radius: 25px;
      }
    }

    &:nth-child(2) {
      h3 {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 8px;
      }

      p {
        padding-bottom: 16px;
      }
    }
  }
`;

export const ImageTable = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #eee;
  margin-right: 10px;
`;
