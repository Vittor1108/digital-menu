import styled from "styled-components";
import { Form as BaseFormComponent } from "@components/BaseForm/styled";

export const Form = styled(BaseFormComponent)`
  > div {
    margin-bottom: 16px;
  }
`;


export const ArticleImage = styled.article`
  border: 1px solid red;
  img{
    object-fit: contain;
    
  }
`