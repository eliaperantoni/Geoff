import React from "react";
import styled from "styled-components";
import firebase from "firebase";

import Item from "components/Item";
import Wrapper from "components/Wrapper";

const StyledCatalogue = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-auto-flow: row;
    grid-gap: 18px;
`;

export default class Catalogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    async componentDidMount() {
        const query = await firebase.firestore().collection("/items").get();
        const items = query.docs.map(doc => doc.data());
        this.setState({items});
    }

    render() {
        return (
            <Wrapper>
                <StyledCatalogue>
                    {this.state.items.map(item => (<Item name={item.name} price={item.price} image={item.image}/>))}
                </StyledCatalogue>
            </Wrapper>
        );
    }
}
