import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
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
import User from "./components/User";

import {GuardProvider, GuardedRoute} from 'react-router-guards';

import Auth from "controller/Auth";

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

const auth = Auth.getInstance();

function authGuard(to, from, next) {
    const redirects = {
        guest: "/login",
        user: "/",
        admin: "/admin/catalogue",
    };

    let currentStatus = "guest";
    if (auth.user) currentStatus = auth.user.isAdmin ? "admin" : "user";

    if(currentStatus === to.meta.only) next();
    else next.redirect(redirects[currentStatus]);
}

export let setLoading;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            initialAuthComplete: false,
        };

        setLoading = loading => {
            this.setState({loading})
        };

        auth.initialLoad.then(() => {
            this.setState({initialAuthComplete: true});
            setLoading(false);
        });
    }

    render() {
        return (
            <StyledApp>
                <GlobalStyle/>
                <Overlay visible={this.state.loading}>
                    <PuffLoader loading={true} size={50} color={"#c7d1d9"}/>
                </Overlay>
                {this.state.initialAuthComplete && (
                    <Router>
                        <GuardProvider guards={[authGuard]}>
                            <Switch>
                                <GuardedRoute exact path="/login" meta={{only: "guest"}}>
                                    <Login/>
                                </GuardedRoute>
                                <GuardedRoute exact path="/register" meta={{only: "guest"}}>
                                    <Register/>
                                </GuardedRoute>
                                <GuardedRoute exact path="/confirm" meta={{only: "guest"}}>
                                    <Confirm/>
                                </GuardedRoute>

                                <GuardedRoute exact path="/" meta={{only: "user"}}>
                                    <Catalogue/>
                                </GuardedRoute>
                                <GuardedRoute exact path="/thanks" meta={{only: "user"}}>
                                    <Thanks/>
                                </GuardedRoute>
                                <GuardedRoute exact path="/checkout" meta={{only: "user"}}>
                                    <Checkout/>
                                </GuardedRoute>
                                <GuardedRoute exact path="/orders" meta={{only: "user"}}>
                                    <Orders/>
                                </GuardedRoute>
                                <GuardedRoute exact path="/user" meta={{only: "user"}}>
                                    <User/>
                                </GuardedRoute>

                                <GuardedRoute exact path="/admin/catalogue" meta={{only: "admin"}}>
                                    <Catalogue admin={true}/>
                                </GuardedRoute>
                                <GuardedRoute exact path="/admin/orders" meta={{only: "admin"}}>
                                    <Orders admin={true}/>
                                </GuardedRoute>

                                <Route path="*">
                                    <C404/>
                                </Route>
                            </Switch>
                        </GuardProvider>
                    </Router>
                )}
            </StyledApp>
        );
    }
}
