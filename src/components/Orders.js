import React, {Component} from "react";
import styled from "styled-components";
import firebase from "firebase";
import moment from "moment";

import Wrapper from "components/Wrapper";
import Card from "components/basic/Card";
import Price from "components/basic/Price";
import Tag from "components/basic/Tag";
import Loader from "components/basic/Loader";

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
  height: 64px;
  width: 64px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  color: #91A6B8;
  flex: 1;
`;

const ItemNameAndQuantity = styled.span`
  font-family: FuturaBold, sans-serif;
  font-size: 1.3rem;
`;

const ItemUnitPrice = styled(Price)`
  font-family: FuturaLight, sans-serif;
  font-size: 1.2rem;
`;

const X = styled.span.attrs(() => ({
    children: "x",
}))`
  color: #C5D2DC;
`;

const ItemTotalPrice = styled(Price)`
  font-family: FuturaBold, sans-serif;
  font-size: 1.4rem;
  color: #91A6B8;
`;

function Item({item}) {
    return (
        <StyledItem>
            <ItemImage src={item.image}/>
            <ItemDetails>
                <ItemNameAndQuantity>{item.quantity}<X/> {item.name}</ItemNameAndQuantity>
                <ItemUnitPrice price={item.price}/>
            </ItemDetails>
            <ItemTotalPrice price={item.price * item.quantity}/>
        </StyledItem>
    );
}

const StyledOrder = styled(Card)`
  display: flex;
  flex-direction: row;
  width: 800px;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex: 1;
  
  > * {
    margin-bottom: 18px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 64px;
  
  > * {
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const OrderDetailsPrimaryText = styled.div`
  font-family: FuturaBold, sans-serif;
  font-size: 2rem;
  color: #91A6B8;
`;

const OrderDetailsSecondaryText = styled.div`
  font-family: FuturaLight, sans-serif;
  font-size: 1.2rem;
  color: #8699AA;
`;

function Order({order}) {
    // Computes total price of all items in this order
    const totalPrice = order.items.map(item => item.price * item.quantity).reduce((val, acc) => val + acc, 0);

    return (
        <StyledOrder>
            <ItemsContainer>
                {order.items.map(item => (<Item item={item} key={item.itemID}/>))}
            </ItemsContainer>
            <OrderDetails>
                <Tag>{order.status}</Tag>
                <OrderDetailsPrimaryText>
                    <Price price={totalPrice}/>
                </OrderDetailsPrimaryText>
                <OrderDetailsSecondaryText>
                    {moment(order.placedAt.toDate()).format("DD MMMM YYYY HH:mm")}
                </OrderDetailsSecondaryText>
                <OrderDetailsSecondaryText>
                    #{order.number}
                </OrderDetailsSecondaryText>
            </OrderDetails>
        </StyledOrder>
    );
}

const OrdersContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-bottom: 24px;
  }
`;

const OrdersTitle = styled.div.attrs(() => ({
    children: "Orders",
}))`
  font-family: FuturaBold, sans-serif;
  font-size: 2.2rem;
  color: #A4BBCD;
  align-self: flex-start;
  margin-left: 24px;
`;

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true,
        };
    }

    // Returns the email of the logged in user
    async getUserEmail() {
        const emailPromise = new Promise(resolve => {
            const unsubscribe = firebase.auth().onAuthStateChanged(async ({email}) => {
                unsubscribe();
                resolve(email);
            });
        });

        return await emailPromise;
    }

    // Returns an array containing all orders of the user with the provided email
    async getUserOrders(email) {
        const query = await firebase.firestore().collection(`/users/${email}/orders`).get();
        const orders = query.docs.map(doc => ({number: doc.id, ...doc.data()}));

        const promises = [];
        const itemsCache = {};

        for (const order of orders) {
            for (const item of order.items) {
                promises.push((async () => {
                    if (!itemsCache[item.itemID]) {
                        const doc = await firebase.firestore().doc(`/items/${item.itemID}`).get();
                        itemsCache[item.itemID] = doc.data();
                    }

                    Object.assign(item, {...itemsCache[item.itemID], ...item});
                })());
            }
        }

        await Promise.all(promises);

        return orders;
    }

    // Returns an array of all orders of all users
    async getGlobalOrders() {
        const orders = [];

        const query = await firebase.firestore().collection(`/users`).get();
        for (const doc of query.docs) {
            orders.push(...await this.getUserOrders(doc.id));
        }

        return orders;
    }

    async componentDidMount() {
        let orders;

        if (this.props.admin)
            orders = await this.getGlobalOrders();
        else
            orders = await this.getUserOrders(await this.getUserEmail());

        this.setState({orders, loading: false});
    }

    render() {
        return (
            <Wrapper hideInput={true}>
                <Loader loading={this.state.loading}/>
                {!this.state.loading && (
                    <OrdersContainer>
                        <OrdersTitle/>
                        {this.state.orders.map(order => (<Order order={order} key={order.number}/>))}
                    </OrdersContainer>
                )}
            </Wrapper>
        );
    }
}
