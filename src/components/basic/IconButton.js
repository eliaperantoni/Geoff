import styled, {css} from "styled-components";
import React from "react";
import Icon from "@mdi/react";

const StyledIconButton = styled.div`
    ${props => (!props.type || props.type === "primary") && css`
        background: linear-gradient(-90deg, #00e74e, #6BE595);
        box-shadow: 0 2px 8px rgba(90,198,127,0.81);
        text-shadow: 0 2px 4px rgba(64,187,108,0.56);
        path {
            fill: #DFFFEA !important;
        }
    `}
    
    ${props => props.type === "danger" && css`
        background: linear-gradient(-90deg, #D80142, #DD4673);
        box-shadow: 0 2px 8px #AD1341;
        text-shadow: 0 2px 4px #FFD2E0;
        path {
            fill: #FFD2E0 !important;
        }
    `}
    
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
