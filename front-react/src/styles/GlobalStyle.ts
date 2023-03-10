import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }


    html, body{
        background-color: #eee;
    }

    ul{
        list-style: none;
    }

    button{
        cursor: pointer;
    }

    a{
        text-decoration: none;
    }

`;
