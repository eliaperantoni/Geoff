import {createGlobalStyle} from "styled-components";

import EuclidCircular from "fonts/euclid_circular.ttf";
import FuturaLight from "fonts/futura_light.ttf";
import FuturaBold from "fonts/futura_bold.ttf";

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
    
    @font-face {
        font-family: EuclidCircular;
        src: url(${EuclidCircular});
    }

    @font-face {
        font-family: FuturaLight;
        src: url(${FuturaLight});
    }
    @font-face {
        font-family: FuturaBold;
        src: url(${FuturaBold});
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
