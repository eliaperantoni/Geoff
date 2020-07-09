import React, {Component} from "react";
import styled from "styled-components";
import Price from "components/basic/Price";

const StyledItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 8px;
  
  &:hover {
    background: #F1F7FB;
  }
`;

const ItemImage = styled.img`
  border-radius: 10px;
  height: 50px;
  width: 50px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  color: #91A6B8;
  flex: 1;
`;

const ItemName = styled.span`
  font-family: FuturaBold, sans-serif;
  font-size: 1.0rem;
`;

const ItemUnitPrice = styled(Price)`
  font-family: FuturaLight, sans-serif;
  font-size: 0.9rem;
`;

const ItemTotalOrder = styled.input`
  font-family: FuturaLight, sans-serif;
  font-size: 1.1rem;
  color: #91A6B8;
  padding: 10px 20px;
  border:none;
  width: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  -moz-appearance: textfield;
  -webkit-appearance: none;
  
  margin: 0;
`;

function OrderItem({item}) {
    return (
        <StyledItem>
            <ItemImage src={item.image}/>
            <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemUnitPrice price={item.price}/>
            </ItemDetails>
            <ItemTotalOrder value={item.quantity}/>
        </StyledItem>
    );
}
export default OrderItem;

