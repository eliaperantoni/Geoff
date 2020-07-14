import React, {useState} from "react";
import styled from "styled-components";
import firebase from "firebase";

import Item from "components/Item";
import Wrapper from "components/Wrapper";
import Loader from "components/basic/Loader";
import Button from "components/basic/Button";
import Detail from "components/Detail";
import Popup from "components/basic/Popup";
import CreateItem from "components/CreateItem";
import {setLoading} from "App";
import Card from "./basic/Card";
import Validation from "../controller/Validation";
import Input from "./basic/Input";

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

const StyledAddStock = styled(Card)`
    z-index: 5;

    display: flex;
    flex-direction: column;
    box-shadow: none;
    
    > * {
        margin-bottom: 18px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

function AddStock({onAddStock}) {
    const [quantity, setQuantity] = useState({
        str: "",
        valid: false,
        touched: false,
    });

    const onChange = e => {
        const val = e.target.value;
        setQuantity({
            str: val,
            valid: Validation.int({min: 1})(val),
            touched: true,
        })
    }

    return (
        <StyledAddStock>
            <Input placeholder="Quantity to add" value={quantity.str} onBlur={() => {
                setQuantity(state => ({...state, touched: true}))
            }} onChange={onChange} invalid={!quantity.valid && quantity.touched}/>
            <Button onClick={() => {
                if (quantity.valid)
                    onAddStock(parseInt(quantity.str));
            }}>Add to stock</Button>
        </StyledAddStock>
    );
}

export default class Catalogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            query: {
                text: "",
                category: "",
                sort: {
                    target: "name",
                    order: "asc",
                }
            },
            loading: true,
            selectedItem: null,

            createItemModal: false,
            addStockModal: false,
            detailModal: false,
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

    onSearch = text => {
        this.setState(state => ({query: {...state.query, text}}));
    }

    onCategory = category => {
        this.setState(state => ({query: {...state.query, category}}));
    }

    onSortTarget = target => {
        this.setState(state => ({query: {...state.query, sort: {...state.query.sort, target}}}));
    }

    onSortOrder = order => {
        this.setState(state => ({query: {...state.query, sort: {...state.query.sort, order}}}));
    }

    deleteItem = id => async () => {
        this.setState({items: [], loading: true});

        await firebase.firestore().doc(`/items/${id}`).update({deleted: true});

        await this.refreshItems();
        this.setState({loading: false});
    }

    addStock = async inc => {
        setLoading(true);

        await firebase.firestore().doc(`/items/${this.state.selectedItem.id}`).update({
            stock: firebase.firestore.FieldValue.increment(inc)
        });

        setLoading(false);
    }

    addToCart = async (itemID, quantity) => {
        setLoading(true);

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

        setLoading(false);
    }

    render() {
        const doesItemMatchText = item => {
            const doesStringResemble = str => {
                return str.toLowerCase().includes(this.state.query.text.toLowerCase());
            }

            return doesStringResemble(item.name) ||
                doesStringResemble(item.brand) ||
                item.tags.reduce((acc, tag) => acc || doesStringResemble(tag), false);
        }

        const doesItemMatchCategory = item => item.category === this.state.query.category;

        const filters = [];

        if (this.state.query.text !== "") filters.push(doesItemMatchText);
        if (this.state.query.category !== "") filters.push(doesItemMatchCategory);

        let items = this.state.items.filter(item => {
            for (const filter of filters) if (!filter(item)) return false;
            return true;
        });

        const sort = this.state.query.sort;

        const sortFunctions = {
            name: (a, b) => a.name.localeCompare(b.name),
            brand: (a, b) => a.brand.localeCompare(b.brand),
            price: (a, b) => a.price - b.price,
        }

        items = items.sort(sortFunctions[sort.target]);

        if(sort.order === "desc") items.reverse();

        let itemsComponents;
        if (this.props.admin) {
            itemsComponents = items.map(item => (
                <Item item={item}
                      key={item.name}

                      admin={true}
                      onDelete={this.deleteItem(item.id)}
                      onAddStock={() => this.setState({addStockModal: true, selectedItem: item})}
                />));
        } else {
            itemsComponents = items.map(item => (
                <Item item={item}
                      key={item.name}
                      disabled={item.stock <= 0}

                      onClick={() => {
                          this.setState({detailModal: true, selectedItem: item});
                      }}
                      onAddToCart={() => this.addToCart(item.id, 1)}
                />));
        }

        return (
            <Wrapper onSearch={this.onSearch} onCategory={this.onCategory} onSortTarget={this.onSortTarget}
                     onSortOrder={this.onSortOrder}>
                <Loader loading={this.state.loading}/>

                <Popup open={this.state.createItemModal}
                       onClose={() => {
                           this.setState({createItemModal: false})
                       }}>
                    <CreateItem onCreated={() => {
                        this.setState({createItemModal: false});
                        this.refreshItems();
                    }}/>
                </Popup>

                <Popup open={this.state.addStockModal}
                       onClose={() => {
                           this.setState({addStockModal: false});
                           this.setState({selectedItem: null});
                       }}>
                    <AddStock onAddStock={async inc => {
                        await this.addStock(inc);

                        this.setState({addStockModal: false});
                        this.setState({selectedItem: null});

                        this.setState({items: [], loading: true});
                        await this.refreshItems();
                        this.setState({loading: false});
                    }}/>
                </Popup>

                <Popup open={this.state.detailModal}
                       onClose={() => {
                           this.setState({detailModal: false});
                           this.setState({selectedItem: null});
                       }}>
                    <Detail item={this.state.selectedItem}
                            onAddToCart={async quantity => {
                                await this.addToCart(this.state.selectedItem.id, quantity);
                                this.setState({detailModal: false});
                                this.setState({selectedItem: null});
                            }}/>
                </Popup>

                {!this.state.loading && (
                    <StyledCatalogue>
                        {this.props.admin && (
                            <AddItem onClick={() => {
                                this.setState({createItemModal: true})
                            }}/>
                        )}
                        {itemsComponents}
                    </StyledCatalogue>
                )}
            </Wrapper>
        );
    }
}
