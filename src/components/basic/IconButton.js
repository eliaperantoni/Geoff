import styled, {css} from "styled-components";
import React from "react";
import Icon from "@mdi/react";
import {darken} from "polished";

const StyledIconButton = styled.div`    
    ${props => {
        const colors = {
            primary: {
                gradient: ["#6BE595", "#00e74e"],
                text: "#e0f8e7",
                boxShadow: "rgba(90,198,127,0.81)",
                textShadow: "rgba(64,187,108,0.56)",
            },
            danger: {
                gradient: ["#DD4673", "#D80142"],
                text: "#FFD2E0",
                boxShadow: "#AD1341",
                textShadow: "#FFD2E0",
            },
        };
    
        const theme = colors[props.type || "primary"];
        
        return css`
            background: linear-gradient(90deg, ${theme.gradient[0]} 0%, ${theme.gradient[1]} 33%, ${darken(0.05, theme.gradient[1])} 66%, ${darken(0.10, theme.gradient[1])} 100%);
            box-shadow: 0 2px 8px ${theme.boxShadow};
            text-shadow: 0 2px 4px ${theme.textShadow};
            path {
                fill: ${theme.text} !important;
            }

            background-size: ${props.size * 48 * 3}px 1px;
            
            &:hover {
                background-position: -${props.size * 48}px;
            }
            
            transition: background 0.2s;
            &:active {
                transition: background 0s;
                background-position: -${props.size * 48 * 2}px;
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
