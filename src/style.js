import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
      min-height: 100vh;
      user-select: none !important;
    }

    html, body, #root {
        display: flex;
        flex: 1;
    }
    
    body {
        background: #F2F7FB;
        margin: 0;
    }
    
    ::-webkit-scrollbar {
        width: 10px;
        background: #EAF3FA;
        border-radius: 100vw;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #CFE1ED;
        border-radius: 100vw;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #bcccdb;
    }
    
    ::-webkit-scrollbar-thumb:active {
        background: #a0b2c4;
    }
`;

export default GlobalStyle;
