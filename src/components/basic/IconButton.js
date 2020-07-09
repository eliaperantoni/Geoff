import styled from "styled-components";
import React from "react";
import Icon from "@mdi/react";

const StyledIconButton = styled.div`
    background: linear-gradient(-90deg, #00e74e, #6BE595);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(90,198,127,0.81);
    text-shadow: 0 2px 4px rgba(64,187,108,0.56);
    height: 48px;
    width: 48px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default class IconButton extends React.Component{
    render() {
        return(
            <StyledIconButton>
                <Icon color="#DFFFEA" size={1} path={this.props.icon}/>
            </StyledIconButton>
        )
    };
}
