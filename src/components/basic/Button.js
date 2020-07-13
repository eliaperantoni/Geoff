import styled, {css} from "styled-components";

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
`;

export default Button;
