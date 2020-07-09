import React from "react";
import styled from "styled-components";

import Card from "components/basic/Card"
import Button from "components/basic/Button";
import Header from "components/basic/Header";
import { withRouter } from "react-router-dom"
import firebase from "firebase.js";

import Icon from '@mdi/react';
import {
    mdiCreditCard,
} from '@mdi/js';
import Wrapper from "components/Wrapper";

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
`;

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const Price = styled.p`
    font-family: FuturaBold, sans-serif;
    font-size: 96px;
    color: #A4BBCD;
    margin:auto;
`;

const BoldText = styled.p`
    font-family: FuturaBold, sans-serif;
    font-weight: bold;
    color: #A4BBCD;
`;

const Text = styled.p`
    font-family: FuturaLight, sans-serif;
    font-size: 24px;
    color: #A4BBCD;
    margin: 40px auto auto;
`;

const Imm = styled.img`
    max-width: 100px;
    max-height: 150px;
`;

function Checkout(props) {
    return (
        <Wrapper>
            <Form>
                <Upper>
                    <Price>22.50€</Price>
                    <Text>
                        Paying with:
                        <BoldText><Icon path={mdiCreditCard} size={1.8}/> **** **** **** 1234</BoldText>
                        Will ship to:
                        <BoldText>Zimba, Palu 13, X</BoldText>
                    </Text>
                    <Button style={{height:'100px'}}>Buy</Button>
                    <Button style={{marginTop:'20px'}}>Change payment method</Button>
                </Upper>
            </Form>
        </Wrapper>
    );
}
export default withRouter(Checkout)
