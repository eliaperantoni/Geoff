import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import styled from "styled-components";

import GlobalStyle from "style";

import Login from "components/Login";
import Register from "components/Register";
import Confirm from "components/Confirm";
import Orders from "components/Orders";
import Test from "components/Test";
import Catalogue from "./components/Catalogue";

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
                    <Route path="/">
                        <Catalogue/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/test">
                        <Test/>
                    </Route>
                    <Route path="/confirm">
                        <Confirm/>
                    </Route>
                    <Route path="/orders">
                        <Orders/>
                    </Route>
                    <Route path="/admin/orders">
                        <Orders global={true}/>
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
