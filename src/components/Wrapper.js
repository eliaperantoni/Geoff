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
  padding: 64px 128px 400px 128px;//EDIT 128px -> 64px
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFooter = styled(Footer)`
  align-self: stretch;
  margin-top: auto;
`;

export default function Wrapper({children, hideInput=false, onInput, onCategory}) {
    return (
        <StyledWrapper>
            <StyledHeader hideInput={hideInput} onInput={onInput} onCategory={onCategory}/>
            <ChildrenWrapper>
                {children}
            </ChildrenWrapper>
            <StyledFooter/>
        </StyledWrapper>
    );
}
