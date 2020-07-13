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
    margin:0;
    justify-content: space-between;
`
const StyledLabeledInput = styled(LabeledInput)`
    margin-top:20px;
`;

const PopUpContainer = styled(Card)`
    min-width: 500px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    
`

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{},
            userApp:{},
            loading:true,
            payments:{},
            defaultMethod:null,
            modalCard:false,
            modalPayPal:false,
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
    async deletePayment(method){
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
            userApp: {name:user.name,surname:user.surname,city:user.city,cap:user.cap,address: user.address,phone:user.phone}, // SOLO PER LO STATO INIZIALE
        })
    }

    methodClick = async(method,action)=>{
        this.setState({loading:true});
        if(action==="set"){
            await this.setDefaultPayment(method);
            this.setState({defaultMethod:method,loading:false});
        }else if(action==="remove"){
            await this.deletePayment(method);
            let payments = await this.getUserPayments(this.state.user.email);
            let defaultM = await this.getDefaultPaymentInList(this.state.user,payments);
            this.setState({defaultMethod:defaultM,payments:payments,loading:false});

        }

    }

    updateUser = async()=>{
        this.setState({ loading:true });
        await firebase.firestore().collection('users').doc(this.state.user.email).update(this.state.userApp);
        let user = await this.getUser();
        this.setState({user:user,userApp: {name:user.name,surname:user.surname,city:user.city,cap:user.cap,address: user.address,phone:user.phone},loading:false});
    }

    changeInput = (target,value)=>{
        let ne = this.state.userApp
        if(target==="phone number"){
            ne["phone"]=value
        }else{
            ne[target]=value
        }
        this.setState({userApp:ne})
    }

    addCard = async () => {
        this.setState({loading: true, modalCard:false});
        let cvv = document.getElementsByName("cvv")[0].value;
        let number = document.getElementsByName("number")[0].value;
        let expirationDate = document.getElementsByName("expiry date")[0].value;
        await firebase.firestore().collection('users').doc(this.state.user.email).collection("paymentMethods").add(
            {cvv:cvv, number:number, expirationDate:expirationDate, type:"card"}
            )
        //TODO CONTROLLO INPUT
        this.setState({loading: false,payments: await this.getUserPayments(this.state.user.email)});
    }

    addPaypal = async () => {
        this.setState({loading: true, modalPayPal:false});
        let email = document.getElementsByName("email")[0].value;
        let password = document.getElementsByName("password")[0].value;
        await firebase.firestore().collection('users').doc(this.state.user.email).collection("paymentMethods").add(
            {email:email, password:password, type:"paypal"}
        )
        //TODO CONTROLLO INPUT
        this.setState({loading: false,payments: await this.getUserPayments(this.state.user.email)});
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
                                <StyledLabeledInput label={"name"} onChange={(e)=>(this.changeInput(e.target.name,e.target.value))} value={this.state.userApp.name}/>
                                <StyledLabeledInput label={"city"} onChange={(e)=>(this.changeInput(e.target.name,e.target.value))} value={this.state.userApp.city}/>
                                <StyledLabeledInput label={"cap"}  onChange={(e)=>(this.changeInput(e.target.name,e.target.value))} value={this.state.userApp.cap}/>
                            </UserInformation>
                            <UserInformation style={{marginTop:"-20px",marginLeft:"20px"}}>
                                <StyledLabeledInput label={"surname"} onChange={(e)=>(this.changeInput(e.target.name,e.target.value))} value={this.state.userApp.surname}/>
                                <StyledLabeledInput label={"address"} onChange={(e)=>(this.changeInput(e.target.name,e.target.value))} value={this.state.userApp.address}/>
                                <StyledLabeledInput label={"phone number"} onChange={(e)=>(this.changeInput(e.target.name,e.target.value))} value={this.state.userApp.phone}/>
                            </UserInformation>
                        </div>
                        <Button style={{marginTop:"20px"}} onClick={()=>this.updateUser()}>Update</Button>
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
                            <Button style={{width:"100%",marginRight:"20px"}} onClick={()=>(this.setState({modalCard:true}))}>Add card</Button>
                            <Button style={{width:"100%",marginLeft:"20px"}} onClick={()=>(this.setState({modalPayPal:true}))}>Add PayPal</Button>
                        </ButtonContainer>
                        <Popup open={this.state.modalCard} onClose={()=>(this.setState({modalCard:false}))}>
                            <PopUpContainer>
                                <StyledLabeledInput label={"number"}/>
                                <ButtonContainer>
                                    <div style={{width:"100%",marginRight:"20px"}}>
                                        <StyledLabeledInput label={"cvv"}/>
                                    </div>
                                    <div style={{width:"100%",marginLeft:"20px"}}>
                                        <StyledLabeledInput style={{width:"100%"}} label={"expiry date"}/>
                                    </div>
                                </ButtonContainer>
                                <Button onClick={()=>(this.addCard())}>Add credit card</Button>
                            </PopUpContainer>
                        </Popup>
                        <Popup open={this.state.modalPayPal} onClose={()=>(this.setState({modalPayPal:false}))}>
                            <PopUpContainer>
                                <StyledLabeledInput label={"email"}/>
                                <StyledLabeledInput style={{width:"100%"}} label={"password"}/>
                                <Button style={{marginTop:"40px"}} onClick={()=>(this.addPaypal())}>Add paypal</Button>
                            </PopUpContainer>
                        </Popup>
                    </Background>
                </Container>)}
            </Wrapper>
        );
    }
}
export default withRouter(User)
