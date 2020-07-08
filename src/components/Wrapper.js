import React from "react";
import styled from "styled-components";

import Header from "components/basic/Header";
import Footer from "components/basic/Footer";

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled(Header)`
  align-self: stretch;
`;

const ChildrenWrapper = styled.div`
  box-sizing: border-box;
  padding: 128px 128px 400px 128px;
`;

const StyledFooter = styled(Footer)`
  align-self: stretch;
  margin-top: auto;
`;

export default function Wrapper(props) {
    return (
        <StyledWrapper>
            <StyledHeader/>
            <ChildrenWrapper>
                {props.children}
            </ChildrenWrapper>
            <StyledFooter/>
        </StyledWrapper>
    );
}
