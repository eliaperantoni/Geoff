import React, {useState} from "react";
import styled, {css} from "styled-components";

const StyledInput = styled.input`
    outline: none;
    border: none;
    border-radius: 18px;
    font-family: FuturaLight, sans-serif;
    font-size: 22px;
    padding: 18px 24px;
    box-shadow: 0 2px 8px rgba(176,195,215,0.26);
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
    
    ${props => props.invalid && !props.quiet && css`
        background: #DB3063;
        color: white;
    `}
`;

export default function Input({validationFunc, onChange, ...rest}) {
    const [validationError, setValidationError] = useState(false);

    return (
        (<StyledInput onChange={e => {
            const payload = {str: e.target.value};
            if(validationFunc) {
                const valid = validationFunc(e.target.value);
                setValidationError(!valid);
                payload.valid = valid;
            }
            if(onChange) onChange(payload);
        }}  invalid={validationError} {...rest}/>)
    );
}
