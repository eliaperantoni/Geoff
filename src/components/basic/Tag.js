import React from "react";
import styled from "styled-components";

const StyledTag = styled.div`
  background: #E5EEF5;
  border-radius: 12px;
  color: #AEC4D6;
  font-family: FuturaBold, sans-serif;
  padding: 12px 16px 10px 16px;
  font-size: 1.1rem;
  text-transform: capitalize;
`;

export default function Tag({children}) {
    return (
        <StyledTag>{children}</StyledTag>
    );
}
