import React, {Component} from "react";
import styled from "styled-components";

import firebase from "firebase";
import Wrapper from "components/Wrapper";

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Order =

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
        };
    }

    componentDidMount() {
        firebase.firestore().collection("orders")
    }

    render() {
        return (
            <Wrapper>
                <OrdersContainer>
                </OrdersContainer>
            </Wrapper>
        );
    }
}
