import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const Label = styled.div`
     font-family: FuturaBold, sans-serif;
     color: #AEC4D6;
     font-size: 1rem;
     text-transform: uppercase;
     margin-bottom: 4px;
     margin-left: 22px;
`;

export default function Labeled({label, className, children}) {
    return (
        <Wrapper className={className}>
            <Label>{label}</Label>
            {children}
        </Wrapper>
    );
}
