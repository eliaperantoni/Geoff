import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import styled, {css} from "styled-components";

import GlobalStyle from "style";

import Login from "components/Login";
import Register from "components/Register";
import Confirm from "components/Confirm";
import Orders from "components/Orders";
import Test from "components/Test";
import Catalogue from "./components/Catalogue";
import Thanks from "./components/Thanks"
import PuffLoader from "react-spinners/PuffLoader";
import Checkout from "./components/Checkout";

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

const Overlay = styled.div`
    z-index: 1000000;
    background: rgba(68,84,100,0.61);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    visibility: hidden;
    
    ${props => props.visible && css`
        visibility: visible;
    `}
`;

export let setLoading;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };

        setLoading = loading => {this.setState({loading})};
    }

    render() {
        return (
            <StyledApp>
                <GlobalStyle/>
                <Overlay visible={this.state.loading}>
                    <PuffLoader loading={true} size={50} color={"#c7d1d9"}/>
                </Overlay>
                <Router>
                    <Switch>
                        <Route exact path="/">
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
                            <Orders admin={true}/>
                        </Route>
                        <Route path="/admin/catalogue">
                            <Catalogue admin={true}/>
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
                    <Route path="/checkout">
                        <Checkout/>
                    </Route>
}
