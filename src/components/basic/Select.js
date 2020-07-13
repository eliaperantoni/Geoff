import React from "react";
import styled, {css} from "styled-components";

const Input = styled.select`
    outline: none;
    border: none;
    border-radius: 18px;
    font-family: FuturaLight, sans-serif;
    font-size: 22px;
    padding: 18px 24px;
    box-shadow: 0 2px 8px rgba(176,195,215,0.26);
    background: white;
    box-sizing: border-box;
    
    &::placeholder {
      color: #dfe4ec;
    }
    
    color: #849cb1;
    
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
    }
    
    ${props => props.invalid && css`
        background: #DB3063;
        color: white;
        
        option {
            color: #849cb1;
            background: white;
        }
    `}
`;

export default Input;