import React, {Component} from "react";
import styled from "styled-components";
import Price from "components/basic/Price";
import firebase from "firebase.js";

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
  height: 48px;
  width: 48px;
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
  padding: 10px 10px;
  border:none;
  width: 50px;
  border-radius: 8px;
  background-color: #ffffff;
  margin: 0;
`;


class OrderItem extends Component {

    constructor(props) {
        super(props);
        this.state ={
            item:props.item,
            quantity: props.quantity,
            onCh : props.onCh,
        }
    }
    render(){
        return (
        <StyledItem>
            <ItemImage src={this.state.item.image}/>
            <ItemDetails>
                <ItemName>{this.state.item.name}</ItemName>
                <ItemUnitPrice price={this.state.item.price}/>
            </ItemDetails>
            <ItemTotalOrder style={{"marginLeft":"20px"}} readonly maxlength="999" type="number" value={this.state.quantity}
                            onChange={(e)=>this.state.onCh(this.state.item,e.target.value)}/>
        </StyledItem>
        );
    }
}
export default OrderItem;

