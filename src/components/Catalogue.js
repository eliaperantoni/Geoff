import React from "react";
import styled from "styled-components";
import firebase from "firebase";

import Item from "components/Item";
import Wrapper from "components/Wrapper";
import Loader from "components/basic/Loader";

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
            loading: true,
        };
    }

    async componentDidMount() {
        await this.refreshItems();
        this.setState({loading: false});
    }

    async refreshItems() {
        const query = await firebase.firestore().collection("/items").where("deleted", "==", false).get();
        const items = query.docs.map(doc => ({id: doc.id, ...doc.data()}));
        this.setState({items});
    }

    onInput = e => {
        this.setState({query: e.target.value});
    }

    deleteItem = id => async () => {
        this.setState({items: [], loading: true});
        await firebase.firestore().doc(`/items/${id}`).update({deleted: true});
        await this.refreshItems();
        this.setState({loading: false});
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
            items = this.state.items.filter(doesItemMatch);

        let itemsComponents;
        if (this.props.admin)
            itemsComponents = items.map(item => (
                <Item name={item.name} price={item.price} image={item.image} stock={item.stock} admin={true} onDelete={this.deleteItem(item.id)} key={item.name}/>));
        else
            itemsComponents = items.map(item => (
                <Item name={item.name} price={item.price} image={item.image} key={item.name}/>));

        return (
            <Wrapper onInput={this.onInput}>
                <Loader loading={this.state.loading}/>
                <StyledCatalogue>
                    {itemsComponents}
                </StyledCatalogue>
            </Wrapper>
        );
    }
}
