import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";
import React from "react";
import logo from "../../img/logo.svg"
import cart from "../../img/cart.svg"
import out from "../../img/logout.svg"
import orders from "../../img/orders.svg"
import profile from "../../img/profile.svg"
import * as firebase from "firebase/app";
import { withRouter } from "react-router-dom";
import Login from "../Login.js"

const Container = styled.div`
    outline: none;
    border: none;
    font-family: FuturaLight, sans-serif;
    font-size: 22px;
    padding: 12px 64px;
    background:#FAFDFF;
    display:flex;
    flex-direction: row;
    margin-top: 0;
    align-items: center;
    height: 50px;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index:999;
    min-width: 300px;
    justify-content: space-between;
`;
const Imm = styled.img`
    max-width: 100px;
    max-height: 150px;
`
const Right = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 0.05;
    justify-content: space-between;
`;
export default function Header(props) {
    const {history} = props;
    return (
        <Container>
        <Imm src={logo}/>
        <Right>
            <Imm src={cart}/>
            <Imm src={orders}/>
            <Imm src={profile}/>
            <Imm src={out} onClick={logout}/>
        </Right>

        </Container>
    );
    async  function logout() {
        try{
            await firebase.auth().signOut();
            history.push('/path');
        }catch(error){
            alert(error.message);
        }
    }
}

