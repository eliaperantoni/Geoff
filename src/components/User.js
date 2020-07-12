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
import LabeledInput from "./basic/LabeledInput";
import PaymentEdit from "./basic/PaymentEdit";

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
`;

const Container = styled.div`
    min-width: 700px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
`
const Background = styled(Card)`
    min-width: 700px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
`
const LoyaltyCard = styled(Card)`
    height: 90px;
    width: 200px;
    background: linear-gradient(-90deg, #00e74e, #6BE595);
    font-family: FuturaBold, sans-serif;
    font-weight: bold;
    font-size: 20px;
    padding:24px;
    border-radius: 5px;
    text-align: left;
    color: #fafdff;
`

const PaymentsContainer= styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
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

const UserInformation = styled.div`
    min-width: 400px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
`
const StyledLabeledInput = styled(LabeledInput)`
    margin-top:20px;
`;

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{},
            loading:true,
            payments:{},
            defaultMethod:null,
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
        return {email:email,...doc.data()}
    }

    async getUserPayments(email) {
        const query = await await firebase.firestore().collection(`users/${email}/paymentMethods`).get();

        return query.docs.map(doc => ({id: doc.id,...doc.data()}));
    }

    async setDefaultPayment(method){
        if(method){
            await firebase.firestore().collection(`users`).doc(this.state.user.email).update({preferredPaymentMethod:method.id});
        }else{
            await firebase.firestore().collection(`users`).doc(this.state.user.email).update({preferredPaymentMethod:null});
        }


    }
    async deletePaymant(method){
        if(method){
            await firebase.firestore().collection('users').doc(this.state.user.email).collection('paymentMethods').doc(method.id).delete();
        }
    }

    async getDefaultPaymentInList(user,payments){
        let defaultMethod=null;
        for (const obj of payments){
            if(obj.id === user.preferredPaymentMethod){
                defaultMethod=obj;
                break;
            }
        }
        return defaultMethod;
    }
    async componentDidMount() {
        let user = await this.getUser();
        let payments = await this.getUserPayments(user.email);
        let defaultM = await this.getDefaultPaymentInList(user,payments);

        this.setState({
            user:user,
            loading:false,
            payments:payments,
            defaultMethod:defaultM,
        })
    }
    methodClick = async(method,action)=>{
        this.setState({loading:true});
        if(action==="set"){
            await this.setDefaultPayment(method);
            this.setState({defaultMethod:method,loading:false});
        }else if(action==="remove"){
            await this.deletePaymant(method);
            let payments = await this.getUserPayments(this.state.user.email);
            let defaultM = await this.getDefaultPaymentInList(this.state.user,payments);
            this.setState({defaultMethod:defaultM,payments:payments,loading:false});

        }

    }
    render(){

        return (
            <Wrapper hideInput={true}>
                {this.state.loading ?(<Loader loading={this.state.loading}/>):(
                <Container>
                    <BoldText style={{paddingLeft:"20px",margin:"0px",fontSize: "36px"}}>{this.state.user.name+ " " +this.state.user.surname}</BoldText>
                    <Background>
                        <BoldText>Loyality card</BoldText>
                        <LoyaltyCard>
                            <div>
                                {this.state.user.name+ " " +this.state.user.surname}
                                <p style={{fontSize: "36px",margin:"0"}}>{this.state.user.loyalityCard ? (this.state.user.loyalityCard):(0)} pt</p>
                                <p style={{textAlign:"right"}}>Geoff</p>
                            </div>
                        </LoyaltyCard>
                        <BoldText>Personal Information</BoldText>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <UserInformation style={{marginTop:"-20px"}}>
                                <StyledLabeledInput label={"NAME"} value={this.state.user.name}/>
                                <StyledLabeledInput label={"CITY"} value={this.state.user.city}/>
                                <StyledLabeledInput label={"CAP"}  value={this.state.user.cap}/>
                            </UserInformation>
                            <UserInformation style={{marginTop:"-20px",marginLeft:"20px"}}>
                                <StyledLabeledInput label={"SURNAME"} value={this.state.user.surname}/>
                                <StyledLabeledInput label={"ADDRESS"} value={this.state.user.address}/>
                                <StyledLabeledInput label={"PHONE NUMBER"} value={this.state.user.phone}/>
                            </UserInformation>
                        </div>
                        <Button style={{marginTop:"20px"}}>Update</Button>
                        <BoldText>Payment Methods</BoldText>
                        <PaymentsContainer>
                            <PaymentEdit method={null} isDefault={null===this.state.defaultMethod} click={this.methodClick}>
                            </PaymentEdit>
                            {this.state.payments.map(method =>(
                                <PaymentEdit method={method} isDefault={this.state.defaultMethod && method.id===this.state.defaultMethod.id} click={this.methodClick}>
                                </PaymentEdit>))
                            }
                        </PaymentsContainer>
                        <ButtonContainer>
                            <Button style={{width:"100%",marginRight:"20px"}}>Add card</Button>
                            <Button style={{width:"100%",marginLeft:"20px"}}>Add PayPal</Button>
                        </ButtonContainer>
                    </Background>
                </Container>)}
            </Wrapper>
        );
    }
}
export default withRouter(User)
