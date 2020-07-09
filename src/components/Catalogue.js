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
            query: "",
        };
    }

    async componentDidMount() {
        const query = await firebase.firestore().collection("/items").get();
        const items = query.docs.map(doc => doc.data());
        this.setState({items});
    }

    onInput = e => {
        this.setState({query: e.target.value});
    }

    render() {
        const doesItemMatch = item => {
            const doesStringResemble = str => {
                return str.toLowerCase().includes(this.state.query.toLowerCase());
            }

            return doesStringResemble(item.name) ||
                doesStringResemble(item.brand) ||
                item.tags.reduce((acc, tag) => acc || doesStringResemble(tag), false);
        }

        let items;
        if (this.state.query === "")
            items = this.state.items;
        else
            items = this.state.items.filter(doesItemMatch)

        return (
            <Wrapper onInput={this.onInput}>
                <StyledCatalogue>
                    {items.map(item => (<Item name={item.name} price={item.price} image={item.image} key={item.name}/>))}
                </StyledCatalogue>
            </Wrapper>
        );
    }
}
