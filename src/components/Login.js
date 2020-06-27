import React from "react";
import styled from "styled-components";
import Card from "./basic/Card"
import Button from "./basic/Button";
import Input from "./basic/Input";
import image from "../img/authentication.svg"
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

const Container = styled(Card)`
    min-width: 400px;
    min-height: 500px; 
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background:#E5E5E5;
    overflow: hidden;
`
const Form = styled(Card)`
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align:center;
    min-width: 400px;
    min-height: 550px; 
    background: #FAFDFF;
    border-radius: 24px;
    box-shadow: 0 2px 64px rgba(232,238,243,0.5);
    padding: 48px 36px;
`
const Upper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: auto;
  flex-grow: 0.2;
  margin-top: 90px;
`
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: auto;
  flex-grow: 0.09;
`
const Immage = styled.img`
    max-width: 340px;
    max-height: 340px;
    margin-top: -140px;
 `
const Par = styled.p`
    margin-top:20px;
    font-family: FuturaLight, sans-serif;
    font-size: 22px;
 `
export default function Login(props) {
    return (

        <Container>
            <Form>
                <Immage src={image}/>
                <Upper>
                    <Input placeholder="Email"></Input>
                    <Input placeholder="Password"></Input>
                </Upper>
                <Bottom>
                    <Button>Login</Button>
                    <Button>Don't have an account?</Button>
                </Bottom>
                <Par>Forgot password ?</Par>
            </Form>
        </Container>
    );
}
