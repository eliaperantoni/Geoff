import styled, {css} from "styled-components";
import React from "react";
import Icon from "@mdi/react";
import {mdiCashMultiple, mdiContactlessPayment, mdiCreditCard, mdiStar,mdiClose} from "@mdi/js";
import IconButton from "./IconButton";

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
const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;

`
const ButtonContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    justify-items: center;
    width: 120px;
`;
function getMethodIcon(method){
    //mdiCreditCard
    if(method.type === "cash"){
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
    if(method.type === "cash"){
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

export default function PaymentEdit({method, isDefault, click}){
    return(
        <Container>
            <BoldText>
                <Icon path={getMethodIcon(method)} size={1.7}/>{getMethodString(method)}
            </BoldText>
            <ButtonContainer>
                {!isDefault ?(
                    <IconButton type={"primary"} icon={mdiStar} onClick={()=>click(method.id, "set")}/>
                ):(<div></div>)}
                {method && method.type !== "cash" && (
                    <IconButton type={"danger"} icon={mdiClose} onClick={()=>click(method.id, "remove")}/>
                )}

            </ButtonContainer>
        </Container>
    )
}
