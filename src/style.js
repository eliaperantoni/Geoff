import {createGlobalStyle} from "styled-components";
import EuclidCircular from "./fonts/euclid_circular.ttf";
import FuturaLight from "./fonts/futura_light.ttf";

const GlobalStyle = createGlobalStyle`
    html {
      min-height: 100vh;
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
`;

export default GlobalStyle;
