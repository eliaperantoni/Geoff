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
import Detail from "./Detail";
import Popup from "./basic/Popup";
import Loader from "./basic/Loader";

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
    font-size: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Text = styled.p`
    font-family: FuturaLight, sans-serif;
    font-size: 24px;
    color: #A4BBCD;
    margin: 40px auto auto;
`;

const PaymentContainer= styled(Card)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    min-width: 300px;
    min-height: 400px;
    background-color: #fafdff;
`
const ModalBasket= styled(Card)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    min-width: 300px;
    min-height: 400px;
    background-color: #fafdff;
`
const PaymentOption = styled.button`
    outline: none;
    border: none;
    border-radius: 18px;
    font-family: FuturaLight, sans-serif;
    font-size: 15px;
    padding: 18px 24px;
    box-shadow: 0 2px 8px rgba(176,195,215,0.26);
    background-color: #fafdff;
    box-sizing: border-box;
    color: #849cb1;
`;


class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            price:0,
            location:"",
            methodIcon: null,
            payments:[],
            paymentMethod:null,
            loading:true,
            isModalOpen:false,
            modalBasket:false,
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

    async getUserPayments(email) {
        const query = await await firebase.firestore().collection(`users/${email}/paymentMethods`).get();

        return query.docs.map(doc => ({id: doc.id,...doc.data()}));
    }

    getMethodIcon(method){
        //mdiCreditCard
        if(method === null){
            return mdiCashMultiple;
        }
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
        if(method === null){
            return "Cash";
        }
        if(method.type === "paypal"){
            return method.email;
        }
        if(method.type === "card"){
            return "**** **** ****"+method.number.slice(method.number.length - 4);
        }
        return "Cash";

    }

    async setDefaultPayment(method){
        //this.setState({ loading:true });
        /*let email = await this.getUserEmail();
        if(method){
            await firebase.firestore().collection(`users`).doc(email).update({preferredPaymentMethod:method.id});
        }else{
            await firebase.firestore().collection(`users`).doc(email).update({preferredPaymentMethod:null});
        }*/

        this.setState({paymentMethod:method, isModalOpen:false, loading: false});

    }

    async componentDidMount() {

        let user = await this.getUser();
        let basket = await this.getUserBasket(user.email);
        if(!basket.length >0){
            this.props.history.push("/");
        }
        let method = null;
        if(user.preferredPaymentMethod){
            method = await firebase.firestore().doc(`/users/${user.email}/paymentMethods/${user.preferredPaymentMethod}`).get();
            method = method.data();
        }
        let price = 0;
        for (const obj of basket){
            const doc = await firebase.firestore().doc(`/items/${obj.itemID}`).get();
            price += doc.data().price * obj.quantity;
        }
        let payments = await this.getUserPayments(user.email);
        this.setState({loading:false,paymentMethod: method,payments: payments,price:price,location: user.city+", "+user.address+", "+user.cap});

    }

    closeModal = () => {
        this.setState({isModalOpen: false});
    }
    closeModalBasket = () => {
        this.setState({modalBasket: false});
    }
    async buy(){
        let user = await this.getUser();
        let basket = user.basket;
        let newBasket = [];
        let correct = true;
        this.setState({loading:true});
        for(const obj of basket){
            let doc = await firebase.firestore().doc(`/items/${obj.itemID}`).get();
            let item = {...doc.data()}
            if(item.deleted){
                correct = false;
            }
            else if(item.stock<obj.quantity){
                correct=false
                if(item.stock !== 0){
                    newBasket.push({quantity:item.stock,itemID:doc.id})
                }
            }else{
                newBasket.push(obj);
            }

        }
        if(correct){
            //CREO ORDINE
            const order = {
                status: ["confirmed", "process", "delivered"][Math.floor(Math.random() * 3)],
                placedAt: firebase.firestore.FieldValue.serverTimestamp(),
                items: basket
            }
            //RIMUOVO L'ORDINE DALLO STOCK
            let points = user.loyaltyCard;
            for (const obj of basket){
                let doc = await firebase.firestore().doc(`/items/${obj.itemID}`).get();
                let item = {...doc.data()}
                const diff = item.stock - obj.quantity;
                points += obj.quantity*item.price;
                await firebase.firestore().collection(`items`).doc(doc.id).update({stock:diff});
            }
            //AGGIORNO IL BASKET
            await firebase.firestore().collection(`users`).doc(user.email).update({basket:[],loyaltyCard:(points)});
            //AGGIUNGO L'ORDINE
            let orderID = await firebase.firestore().collection('users').doc(user.email).collection('orders').add({...order});

            this.props.history.push({pathname:"/thanks", data: {order:orderID.id}});
        }else{
            //CARRELLO SBAGLIATO e LO CORREGGO
            await firebase.firestore().collection(`users`).doc(user.email).update({basket:newBasket});
            let price = 0;
            for (const obj of newBasket){
                const doc = await firebase.firestore().doc(`/items/${obj.itemID}`).get();
                price += doc.data().price * obj.quantity;
            }

            if(!newBasket.length >0){
                this.props.history.push("/");
            }
            this.setState({price:price,loading:false,modalBasket:true});
        }

    }
    render(){
        return (
            <Wrapper hideInput={true}>
                {this.state.loading ?(<Loader loading={this.state.loading}/>):(
                    <Form>
                        <Upper>
                            <TotalPrice price={this.state.price}/>
                            <Text>
                                Paying with:
                                <BoldText><Icon path={this.getMethodIcon(this.state.paymentMethod)} size={1.7}/> {this.getMethodString(this.state.paymentMethod)}</BoldText>
                                Will ship to:
                                <BoldText>{this.state.location}</BoldText>
                            </Text>
                            <Popup open={this.state.modalBasket} onClose={this.closeModalBasket}>
                                <ModalBasket>
                                    <BoldText>Attention the basket has been modified</BoldText>
                                </ModalBasket>
                            </Popup>
                            <Popup open={this.state.isModalOpen} onClose={this.closeModal}>
                                <PaymentContainer>
                                    {this.state.payments.map(method =>(
                                        <PaymentOption onClick={()=>this.setDefaultPayment(method)} >
                                            <Icon path={this.getMethodIcon(method)} size={1.5}/>
                                            <BoldText>{this.getMethodString(method)}</BoldText>
                                        </PaymentOption>))
                                    }
                                    <PaymentOption onClick={()=>this.setDefaultPayment(null)} >
                                        <Icon path={this.getMethodIcon(null)} size={1.5}/>
                                        <BoldText>{this.getMethodString(null)}</BoldText>
                                    </PaymentOption>
                                </PaymentContainer>
                            </Popup>
                            <Button style={{height:'100px'}} onClick={()=>this.buy()}>Buy</Button>
                            <Button onClick={()=>this.setState({isModalOpen:true})} style={{marginTop:'20px'}}>Change payment method</Button>
                        </Upper>
                    </Form>
                )}


            </Wrapper>
        );
    }
}
export default withRouter(Checkout);
