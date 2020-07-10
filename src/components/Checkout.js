import React, {Component} from "react";
import styled from "styled-components";
import Card from "components/basic/Card"
import Button from "components/basic/Button";
import { withRouter } from "react-router-dom"
import firebase from "firebase.js";

import Icon from '@mdi/react';
import {
    mdiCreditCard,
    mdiCashMultiple,
    mdiContactlessPayment,
} from '@mdi/js';
import Wrapper from "components/Wrapper";
import Price from "./basic/Price";

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


const TotalPrice = styled(Price)`
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

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            price:0,
            location:"",
            methodString: "",
            methodIcon: null,
        };
    }
    async getUserEmail() {
        const emailPromise = new Promise(resolve => {
            const unsubscribe = firebase.auth().onAuthStateChanged(async ({email}) => {
                unsubscribe();
                resolve(email);
            });
        });

        return await emailPromise;
    }

    async getUser(){
        let email = await this.getUserEmail();
        const doc = await firebase.firestore().collection(`users`).doc(email).get();
        return doc.data()
    }

    async getUserBasket(email) {
        const query = await firebase.firestore().collection(`users`).doc(email).get();
        if(!query.exists){
            alert("empty");
        }else{
            return query.data().basket;
        }
    }

    getMethodIcon(method){
        //mdiCreditCard
        if(method.type === "paypal"){
            return mdiContactlessPayment;
        }
        if(method.type === "card"){
            return mdiCreditCard;
        }
        return mdiCashMultiple;
    }

    getMethodString(method){
        //"**** **** **** 1234"
        if(method.type === "paypal"){
            return method.email;
        }
        if(method.type === "card"){
            return "**** **** ****"+method.number.slice(method.number.length - 5);
        }
        return "Cash";

    }

    async componentDidMount() {
        let user = await this.getUser();
        let basket = await this.getUserBasket(user.email);
        let method = null;
        if(user.preferredPaymentMethod){
            method = await firebase.firestore().doc(`/users/${user.email}/paymentMethods/${user.preferredPaymentMethod}`).get();
            method = method.data();
        }
        let methodString = this.getMethodString(method);
        let methodIcon = this.getMethodIcon(method);
        let price = 0;
        for (const obj of basket){
            const doc = await firebase.firestore().doc(`/items/${obj.itemID}`).get();
            price += doc.data().price * obj.quantity;
        }
        this.setState({price:price,location: user.city+", "+user.address+", "+user.cap, methodString:methodString, methodIcon:methodIcon});

    }

    render(){
        return (
            <Wrapper hideInput={true}>
                <Form>
                    <Upper>
                        <TotalPrice price={this.state.price}/>
                        <Text>
                            Paying with:
                            <BoldText><Icon path={this.state.methodIcon} size={1.7}/> {this.state.methodString}</BoldText>
                            Will ship to:
                            <BoldText>{this.state.location}</BoldText>
                        </Text>
                        <Button style={{height:'100px'}}>Buy</Button>
                        <Button style={{marginTop:'20px'}}>Change payment method</Button>
                    </Upper>
                </Form>
            </Wrapper>
        );
    }
}
export default withRouter(Checkout)
