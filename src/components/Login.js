import React from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";

//---LOGIN

//ASSINCRONO
//const i = firebase.auth().signInWithEmailAndPassword(em,pw);
//i.then((params)=>{console.log(params)});
//---OPPURE
//const i = await firebase.auth().signInWithEmailAndPassword(em,pw);
//QUI I CONTIENE IL VALORE EFFETTIVO, ASPETTO IL VALORE

//CONTEXT ASYNC POSSO SOLO FARLO QUI IL AWAI PER METTERE TUTTE LE COSE ASINCRONE DIVISE SENZA
//DOVER STOPPARE IL MAIN, POSSO CHIAMARLA OVUNQUE
//async function f(){
    //POSSO METTERE
//}
//f().then();//DON'T STOP CODE
//await f();//STOP CODE

const Header = styled.div`
  width:100%;
  height: 256px;
  background: red;
`;

const Footer = styled.div`
  width:100%;
  height: 256px;
  background: blue;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function Login(props) {
    return (
        <Wrapper>
            <Header/>
            {props.children}
            <Footer/>
        </Wrapper>
    );
}
