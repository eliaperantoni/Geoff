import styled from "styled-components";

const Input = styled.input`
    outline: none;
    border: none;
    border-radius: 18px;
    font-family: FuturaLight, sans-serif;
    font-size: 22px;
    padding: 18px 24px;
    box-shadow: 0 2px 8px rgba(176,195,215,0.26);
    
    &::placeholder {
      color: #dfe4ec;
    }
    
    color: #849cb1;
`;

export default Input;
