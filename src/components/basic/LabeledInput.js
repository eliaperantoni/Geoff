import React from "react";
import styled from "styled-components";
import Input from "components/basic/Input";

import {omit} from "lodash";

const StyledLabeledInput = styled.div`
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

export default function LabeledInput(props) {
    return (
        <StyledLabeledInput className={props.className}>
            <Label>{props.children}</Label>
            <Input {...omit(props, ["className", "children"])}/>
        </StyledLabeledInput>
    );
}
