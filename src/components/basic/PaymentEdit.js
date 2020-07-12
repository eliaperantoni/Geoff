import styled, {css} from "styled-components";
import React from "react";
import Icon from "@mdi/react";
import {mdiCashMultiple, mdiContactlessPayment, mdiCreditCard} from "@mdi/js";


const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;

`
function getMethodIcon(method){
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

function getMethodString(method){
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

export default function PaymentEdit({method, isDefault, onClick}){

    return(
        <Container>
            <BoldText><Icon path={this.getMethodIcon(this.state.paymentMethod)} size={1.7}/> {this.getMethodString(this.state.paymentMethod)}</BoldText>


        </Container>
    )
}
