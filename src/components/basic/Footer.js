import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  background: #E5EEF5;
  height: 500px;
  box-sizing: border-box;
`;

const Geoff = styled.div.attrs(() => ({
    children: "Geoff",
}))`
  font-family: EuclidCircular, sans-serif;
  color: #CFDDE8;
  padding: 64px;
  font-size: 2.6rem;
`;

export default function Footer({className}) {
    return (
        <StyledFooter {...{className}}>
            <Geoff/>
        </StyledFooter>
    );
}
