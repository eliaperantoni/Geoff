import React from "react";
import styled from "styled-components";
import firebase from "firebase";

import Item from "components/Item";
import Wrapper from "components/Wrapper";
import Loader from "components/basic/Loader";
import Button from "components/basic/Button";
import Detail from "components/Detail";
import Popup from "reactjs-popup";

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

const StyledPopup = styled(Popup)`
    &-content {
        background: none !important;
        border: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }

    &-overlay {
        background: rgba(68,84,100,0.61) !important;
    }
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
                <Item name={item.name} price={item.price} image={item.image} onClick={this.openItem(item)} key={item.name}/>));

        return (
            <Wrapper onInput={this.onInput}>
                <Loader loading={this.state.loading}/>

                <StyledPopup modal closeOnDocumentClick open={this.state.isModalOpen} onClose={() => {this.setState({isModalOpen: false})}}>
                    {this.props.admin
                        ? <div>TODO</div>
                        : <Detail item={this.state.selectedItem}/>
                    }
                </StyledPopup>

                {!this.state.loading && (
                    <StyledCatalogue>
                        {this.props.admin && (<AddItem onClick={() => {this.setState({isModalOpen: true})}}/>)}
                    {itemsComponents}
                    </StyledCatalogue>
                )}
            </Wrapper>
        );
    }
}
