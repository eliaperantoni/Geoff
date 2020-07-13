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
    
    ${props => (!props.type || props.type === "primary") && css`
        background: linear-gradient(-90deg, #00e74e, #6BE595);
        color: #e0f8e7;
        box-shadow: 0 2px 8px rgba(90,198,127,0.81);
        text-shadow: 0 2px 4px rgba(64,187,108,0.56);
    `}
    
    ${props => props.type === "secondary" && css`
        background: linear-gradient(-90deg, #00AB3A, #4DB671);
        color: #D1FFE1;
        box-shadow: 0 2px 8px rgba(35,147,73,0.7);
        text-shadow: 0 2px 4px rgba(28,100,53,0.7);
    `}
    
    ${props => {
        const colors = {
            primary: {
                gradient: ["#00e74e", "#6BE595"],
                text: "#e0f8e7",
                boxShadow: "rgba(90,198,127,0.81)",
                textShadow: "rgba(64,187,108,0.56)",
            },
            secondary: {
                gradient: ["#00AB3A", "#4DB671"],
                text: "#D1FFE1",
                boxShadow: "rgba(35,147,73,0.7)",
                textShadow: "rgba(28,100,53,0.7)",
            },
        };
        
        const theme = colors[props.type || "primary"];
        const darkenAmount = 0.1;
        
        return css`
            background: linear-gradient(-90deg, ${theme.gradient[0]}, ${theme.gradient[1]});
            color: ${theme.text};
            box-shadow: 0 2px 8px ${theme.boxShadow};
            text-shadow: 0 2px 4px ${theme.textShadow};
            
            &:hover {
                background: linear-gradient(-90deg, ${darken(darkenAmount, theme.gradient[0])}, ${darken(darkenAmount, theme.gradient[1])});
                color: ${darken(darkenAmount, theme.text)};
                box-shadow: 0 2px 8px ${darken(darkenAmount, theme.boxShadow)};
                text-shadow: 0 2px 4px ${darken(darkenAmount, theme.textShadow)};
            }
        `;
    }}
`;

export default Button;
