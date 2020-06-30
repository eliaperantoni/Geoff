import React from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";

import logoSVG from "img/logo.svg";
import cartSVG from "img/cart.svg";
import logoutSVG from "img/logout.svg";
import ordersSVG from "img/orders.svg";
import profileSVG from "img/profile.svg";

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

const Image = styled.img`
    max-width: 100px;
    max-height: 150px;
`;

const Right = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 0.05;
    justify-content: space-between;
`;

export default function (props) {
	const {history} = props;
    return (
        <Container>
        <Image src={logoSVG}/>
        <Right>
            <Image src={cartSVG}/>
            <Image src={ordersSVG}/>
            <Image src={profileSVG}/>
            <Image src={logoutSVG} onClick={logout}/>
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

