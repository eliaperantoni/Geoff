import React, {Component} from "react";
import styled from "styled-components";
import firebase from "firebase";

import Header from "components/basic/Header";

const StyledOrders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export default class Orders extends Component {
    render() {
        return (
            <StyledOrders>
                <Header/>
            </StyledOrders>
        );
    }
}
