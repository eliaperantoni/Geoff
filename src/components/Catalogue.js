import React from "react";
import styled from "styled-components";
import firebase from "firebase";

import Item from "components/Item";
import Wrapper from "components/Wrapper";
import Loader from "components/basic/Loader";
import Button from "components/basic/Button";
import Detail from "components/Detail";
import Popup from "components/basic/Popup";
import CreateItem from "components/CreateItem";

const StyledCatalogue = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-auto-flow: row;
    grid-gap: 18px;
`;

const AddItem = styled(Button).attrs(() => ({
    children: "Add",
}))`
    grid-column: span 3;
    height: 64px;
    margin-bottom: 18px;
`;

export default class Catalogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            query: "",
            loading: true,
            isModalOpen: false,
            selectedItem: null,
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

    openItem = item => () => {
        this.setState({isModalOpen: true, selectedItem: item})
    }

    closeItem = () => {
        this.setState({isModalOpen: false, selectedItem: null});
    }

    addToCart = async (itemID, quantity) => {
        const userRef = firebase.firestore().doc(`/users/${firebase.auth().currentUser.email}`);

        await firebase.firestore().runTransaction(async transaction => {
            const userDoc = await transaction.get(userRef);
            const user = userDoc.data();

            for (const item of user.basket) {
                if (item.itemID === itemID) {
                    item.quantity += quantity;
                    await transaction.update(userRef, user);
                    return;
                }
            }

            user.basket.push({
                itemID: itemID,
                quantity,
            });
            await transaction.update(userRef, user);
        });
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
                <Item name={item.name} price={item.price} image={item.image} stock={item.stock} admin={true}
                      onDelete={this.deleteItem(item.id)} key={item.name}/>));
        else
            itemsComponents = items.map(item => (
                <Item name={item.name} price={item.price} image={item.image} onClick={this.openItem(item)}
                      onAddToCart={() => this.addToCart(item.id, 1)} key={item.name}/>));

        return (
            <Wrapper onInput={this.onInput}>
                <Loader loading={this.state.loading}/>

                <Popup open={this.state.isModalOpen} onClose={this.closeItem}>
                    {this.props.admin
                        ? <CreateItem onCreated={() => {
                            this.refreshItems();
                            this.setState({isModalOpen: false});
                        }}/>
                        : <Detail item={this.state.selectedItem} onAddToCart={async quantity => {
                            await this.addToCart(this.state.selectedItem.id, quantity);
                            this.closeItem();
                        }}/>
                    }
                </Popup>

                {!this.state.loading && (
                    <StyledCatalogue>
                        {this.props.admin && (<AddItem onClick={() => {
                            this.setState({isModalOpen: true})
                        }}/>)}
                        {itemsComponents}
                    </StyledCatalogue>
                )}
            </Wrapper>
        );
    }
}
