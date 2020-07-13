import styled, {css} from "styled-components";
import React from "react";
import Icon from "@mdi/react";
import {darken} from "polished";

const StyledIconButton = styled.div`    
    ${props => {
        const colors = {
            primary: {
                gradient: ["#00e74e", "#6BE595"],
                text: "#e0f8e7",
                boxShadow: "rgba(90,198,127,0.81)",
                textShadow: "rgba(64,187,108,0.56)",
            },
            danger: {
                gradient: ["#D80142", "#DD4673"],
                text: "#FFD2E0",
                boxShadow: "#AD1341",
                textShadow: "#FFD2E0",
            },
        };
    
        const theme = colors[props.type || "primary"];
        const darkenAmount = 0.1;
        
        return css`
            background: linear-gradient(-90deg, ${theme.gradient[0]}, ${theme.gradient[1]});
            box-shadow: 0 2px 8px ${theme.boxShadow};
            text-shadow: 0 2px 4px ${theme.textShadow};
            path {
                fill: ${theme.text} !important;
            }

            &:hover {
                background: linear-gradient(-90deg, ${darken(darkenAmount, theme.gradient[0])}, ${darken(darkenAmount, theme.gradient[1])});
                box-shadow: 0 2px 8px ${darken(darkenAmount, theme.boxShadow)};
                text-shadow: 0 2px 4px ${darken(darkenAmount, theme.textShadow)};
                path {
                    fill: ${darken(darkenAmount, theme.text)} !important;
                }
            }
        `;
    }}
    
    border-radius: 8px;
    
    ${props => {
        const pixels = props.size * 48;
        
        return css`
            height: ${pixels}px;
            width: ${pixels}px;
        `;
    }};
    
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    ${props => props.disabled && css`
        filter: saturate(20%);
        cursor: default;
    `}
`;

export default function IconButton({disabled, onClick, icon, size=1, ...rest}){
    return(
        <StyledIconButton disabled={disabled} size={size} {...rest} onClick={e => {
            e.stopPropagation();
            if(!disabled && onClick) onClick();
        }}>
            <Icon size={size} path={icon}/>
        </StyledIconButton>
    )
}
