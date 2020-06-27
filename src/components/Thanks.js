import React from "react";
import styled from "styled-components";
import Card from "./basic/Card"
import Button from "./basic/Button";
import Input from "./basic/Input";
import image from "../img/thanks.svg"
import Header from "./basic/Header"


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
    margin-top:70px;
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align:center;
    width: 800px;
    min-height: 400px; 
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
const Immage = styled.img`
    max-width: 340px;
    max-height: 340px;
    margin-top: -140px;
 `
const Title = styled.p`
    margin-top:20px;
    font-family: FuturaBold, sans-serif;
    font-weight: 900;
    line-height: 38px;
    font-size: 48px;
    color: #859EB3;
    margin:auto;
    margin-bottom: 30px;
 `
const Par = styled.p`
    margin-top:20px;
    font-family: FuturaLight, sans-serif;
    font-size: 48px;
    color: #AAB8C2;
 `
export default function Confirm(props) {
    return (

        <Container>
            <Header></Header>
            <Form>
                <Immage src={image}/>
                <Upper>

                    <Par>
                        <Title>Your order has been placed!</Title>
                        #1234
                    </Par>
                </Upper>

            </Form>
        </Container>
    );
}
