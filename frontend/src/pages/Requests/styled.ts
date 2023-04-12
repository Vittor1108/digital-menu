import styled from "styled-components";

export const SectionRequest = styled.section`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CardRequest = styled.article`
  border: 1px solid #eee;
  padding: 10px;
  min-width: 32%;
  margin: 0 0.5% 28px 0.5%;
  div {
    &:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 8px;
      border-bottom: 1px solid black;
      padding-bottom: 4px;
      > h2 {
        padding: 5px;
        font-weight: bold;
        span {
          padding: 5px;
          background-color: black;
          color: white;
          font-size: 12px;
          margin-right: 4px;
          border-radius: 4px;
        }
      }

      > h3 {
        border: 1px solid red;
        background-color: red;
        color: white;
        padding: 4px;
        font-size: 12px;
        border-radius: 4px;
      }
    }
  }

  ul {
    border-bottom: 1px solid black;
    margin-bottom: 12px;
    li {
      padding: 8px 0;
      &:nth-child(even){
        background-color: #ccc;

      }
    }
  }

  > p{
    margin-bottom: 12px;
    font-size: 12px;
    border-bottom: 1px solid black;
    padding-bottom: 8px;

    span{
      font-weight: bold;
    }
  }


  .info{
    margin-bottom: 12px;
    font-size: 12px;
    text-align: left;
    border-bottom: 1px solid black;
    padding-bottom: 8px;
    p{
      span{
        font-weight: bold;
      }
    }
  }


  .time{
    margin-bottom: 12px;
    font-size: 12px;
    text-align: left;
    border-bottom: 1px solid black;
    padding-bottom: 8px;
    p{
      span{
        font-weight: bold;
      }
      &:nth-child(1){
        margin-bottom: 4px;
      }
    }
  }
`;


export const CountRequests = styled.p` 
  text-align: left;
  font-size: 14px;
  span{
    font-weight: bold;
  }
`