import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import styled from "styled-components";

import GlobalStyle from "/src/style";

import Login from "/src/components/Login";
import Register from "/src/components/Register";
import Confirm from "/src/components/Confirm";
import Checkout from "/src/components/Checkout";
import Thanks from "/src/components/Thanks";

const StyledApp = styled.div`
    display: flex;
    flex: 1;
`;

const C404 = styled.div.attrs(() => ({
    children: "404",
}))`
    font-family: EuclidCircular, sans-serif;
    font-size: 3em;
    color: #dae1ec;
    user-select: none;
    
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

function App() {
    return (
        <StyledApp>
            <Router>
                <GlobalStyle/>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/confirm">
                        <Confirm/>
                    </Route>
                    <Route path="/checkout">
                        <Checkout/>
                    </Route>
                    <Route path="/thanks">
                        <Thanks/>
                    </Route>
                    <Route>
                        <C404/>
                    </Route>
                </Switch>
            </Router>
        </StyledApp>
    );
}

export default App;
