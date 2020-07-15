import React, {useState} from "react";
import styled from "styled-components";
import firebase from "firebase";

import Item from "components/Item";
import Wrapper from "components/Wrapper";
import Button from "components/basic/Button";
import Detail from "components/Detail";
import Popup from "components/basic/Popup";
import CreateItem from "components/CreateItem";
import Card from "./basic/Card";
import Validation from "controller/Validation";
import Auth from "controller/Auth";
import Search from "controller/Search";
import Items from "controller/Items";
import Input from "components/basic/Input";

const auth = Auth.getInstance();

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
            basket: [],
            query: {
                text: "",
                category: "",
                sort: {
                    target: "name",
                    order: "asc",
                }
            },
            selectedItem: null,


            createItemModal: false,
            addStockModal: false,
            detailModal: false,
        };
    }

    removeListeners = [];

    componentDidMount() {
        this.removeListeners.push(
            firebase.firestore().collection("/items").where("deleted", "==", false).onSnapshot(snap => {
                const items = snap.docs.map(doc => ({id: doc.id, ...doc.data()}));
                this.setState({items});
            })
        );

        this.removeListeners.push(
            firebase.firestore().doc(`/users/${auth.user.email}`).onSnapshot(snap => {
                this.setState({basket: snap.data().basket});
            })
        );
    }

    componentWillUnmount() {
        for(const removeListener of this.removeListeners) {
            removeListener();
        }
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

    deleteItem = id => () => {
        Items.deleteItem(id);
    }

    addStock = inc => {
        Items.addStock(this.state.selectedItem.id, inc);
    }

    addToCart = (itemID, quantity) => {
        Items.addToCart(itemID, quantity);
    }

    render() {
        const items = Search.search(this.state.items, this.state.query.text, this.state.query.category, this.state.query.sort);

        for(const item of items) {
            for(const basketItem of this.state.basket) {
                if(item.id !== basketItem.itemID) continue;

                item.stock -= basketItem.quantity;
            }
        }

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

                <Popup open={this.state.createItemModal}
                       onClose={() => {
                           this.setState({createItemModal: false})
                       }}>
                    <CreateItem onCreated={() => {
                        this.setState({createItemModal: false});
                    }}/>
                </Popup>

                <Popup open={this.state.addStockModal}
                       onClose={() => {
                           this.setState({addStockModal: false, selectedItem: null});
                       }}>
                    <AddStock onAddStock={async inc => {
                        this.addStock(inc);
                        this.setState({addStockModal: false, selectedItem: null});
                    }}/>
                </Popup>

                <Popup open={this.state.detailModal}
                       onClose={() => {
                           this.setState({detailModal: false, selectedItem: null});
                       }}>
                    <Detail item={this.state.selectedItem}
                            onAddToCart={async quantity => {
                                this.addToCart(this.state.selectedItem.id, quantity);
                                this.setState({detailModal: false, selectedItem: null});
                            }}/>
                </Popup>

                <StyledCatalogue>
                    {this.props.admin && (
                        <AddItem onClick={() => {
                            this.setState({createItemModal: true})
                        }}/>
                    )}
                    {itemsComponents}
                </StyledCatalogue>
            </Wrapper>
        );
    }
}
