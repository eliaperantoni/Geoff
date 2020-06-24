import React from "react";
import styled from "styled-components";
import Card from "./basic/Card"
import Button from "./basic/Button";
import Header from "./basic/Header";
import * as firebase from "firebase/app";

const Container = styled(Card)`
    top:0;
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
    width: 600px;
    min-height: 500px; 
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
  margin-top: 75px;
`
const Title = styled.p`
    margin-top:20px;
    font-family: FuturaLight, sans-serif;
    font-weight: 900;
    line-height: 38px;
    font-size: 48px;
    color: #859EB3;
 `
const BoldText = styled.p`
    font-family: FuturaLight, sans-serif;
    font-weight: bold;
    line-height: 22px;
    font-size: 22px;
    color: #859EB3;
 `
export default function Confirm(props) {
    return (

        <Container>
            <Header/>
            <Form>
                <Upper>
                    <Title>22.50€</Title>
                    <BoldText>**** **** **** 1234</BoldText>
                    <BoldText>Zimba, Palu 13, X</BoldText>
                </Upper>

            </Form>
        </Container>
    );
}
