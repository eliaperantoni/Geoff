import styled from "styled-components";
import React from "react";

const Button = styled.button`
    background: linear-gradient(-90deg, #00e74e, #6BE595);
    outline: none;
    border: none;
    color: #e0f8e7;
    font-family: EuclidCircular, sans-serif;
    font-size: 18px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(90,198,127,0.81);
    text-shadow: 0 2px 4px rgba(64,187,108,0.56);
    height: 48px;
    cursor: pointer;
`;

export default class IconButton extends React.Component{
    render() {
        return(
            <Button>
                <img src={this.props.img}/>
            </Button>
        )
    };
}
