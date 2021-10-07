import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }
  
  html {
    font-size: 62.5%; 
    background: #020B20;
    color: white;
  }

  textarea{
    font-family: "Montserrat", sans-serif;
  }
  
  body {
    margin:0;
    font-size: 1.6rem;
    font-family: 'Montserrat', sans-serif;
    min-height: 100vh;
  }

  p, h1,h2,h3,h4,h5{
    margin:0.7rem;
  }

  a {
    color: #ff8855;
    text-decoration: none;
  }

`;

export default GlobalStyle;
