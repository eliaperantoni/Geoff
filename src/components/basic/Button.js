import styled, {css} from "styled-components";
import {darken} from "polished";

const Button = styled.button`
    outline: none;
    border: none;
    font-family: EuclidCircular, sans-serif;
    font-size: 18px;
    border-radius: 8px;
    height: 48px;
    padding: 0 64px;
    cursor: pointer;
    
    ${props => props.disabled && css`
        filter: saturate(20%);
        cursor: default;
    `}
    
    ${props => {
        const colors = {
            primary: {
                gradient: ["#6BE595", "#00e74e"],
                text: "#e0f8e7",
                boxShadow: "rgba(90,198,127,0.81)",
                textShadow: "rgba(64,187,108,0.56)",
            },
            secondary: {
                gradient: ["#4DB671", "#00AB3A"],
                text: "#D1FFE1",
                boxShadow: "rgba(35,147,73,0.7)",
                textShadow: "rgba(28,100,53,0.7)",
            },
        };
        
        const theme = colors[props.type || "primary"];
        
        return css`
            background: linear-gradient(90deg, ${theme.gradient[0]} 0%, ${theme.gradient[1]} 33%, ${darken(0.05, theme.gradient[1])} 66%, ${darken(0.10, theme.gradient[1])} 100%);
            color: ${theme.text};
            box-shadow: 0 2px 8px ${theme.boxShadow};
            text-shadow: 0 2px 4px ${theme.textShadow};
            
            background-size: 300% 1px;
            
            &:hover {
                background-position: 50%;
            }
            
            transition: background 0.2s;
            &:active {
                background-position: 100%;
            }
        `;
    }}
`;

export default Button;
