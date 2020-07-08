import React from "react";
import styled from "styled-components";
import {Switch, Route} from "react-router-dom";

import Header from "components/basic/Header";
import Footer from "components/basic/Footer";
import Confirm from "components/Confirm";

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled(Header)`
  align-self: stretch;
`;

const RouteWrapper = styled.div`
  box-sizing: border-box;
  padding: 128px 128px 400px 128px;
`;

const StyledFooter = styled(Footer)`
  align-self: stretch;
  margin-top: auto;
`;

export default function Wrapper() {
    return (
        <StyledWrapper>
            <StyledHeader/>
            <RouteWrapper>
                <Switch>
                    <Route>
                        <Confirm/>
                    </Route>
                </Switch>
            </RouteWrapper>
            <StyledFooter/>
        </StyledWrapper>
    );
}
