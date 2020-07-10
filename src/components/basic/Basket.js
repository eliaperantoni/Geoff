import React, {Component} from "react";
import styled from "styled-components";
import Button from "components/basic/Button.js"
import OrderItem from "components/OrderItem"
import Price from "components/basic/Price";
import firebase from "firebase";
import { withRouter } from "react-router-dom";

const Box =  styled.div`
    margin-left: 50px;
    margin-top:40px;
    height: 400px;
    width: 300px;
    background-color: #fafdff;
    border-radius: 8px;
    cursor: pointer;
`;
const Triangle = styled.div`
    width: 0;
    height: 0;
    margin-top: -40px;
    margin-right:20px;
    float:right;
    border-style: solid;
    border-width: 0 20px 50px 20px;
    border-color: transparent transparent #fafdff transparent;
`;
const Body = styled.div`
    width: 250px;
    height: 350px;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    flex-direction: column;
    padding:22px;
    
`
const Scroll = styled.div`
    overflow: auto;
    height: 340px;
    width: 250px;
`
const OrderTotalPrice = styled(Price)`
  font-family: FuturaBold, sans-serif;
  font-size: 2rem;
  color: #91A6B8;
  text-align:center;
  margin-top:20px;
  margin-bottom:10px;
`;


class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            price : 0,
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
    // Returns an array containing all products of the user with the provided email
    async getUserProducts(email) {
        const query = await firebase.firestore().collection(`users`).doc(email).get();
        if(!query.exists){
            alert("empty");
        }else{
            return query.data().basket;
        }
    }

    async componentDidMount() {
        let email = await this.getUserEmail();
        let products =  await this.getUserProducts(email);
        let basket = [];
        let price = 0;
        for (const obj of products){

            const doc = await firebase.firestore().doc(`/items/${obj.itemID}`).get();
            let item = {...doc.data(), quantity: obj.quantity}
            basket.push(item);
            price += item.quantity * item.price;
        }
            this.setState({products:basket,price:price});
        }


    setPosition(){
            return {position:"absolute",
                    left: this.props.x,
                    top: this.props.y,
            }
        }
    render(){
        return(
        <Box style={this.setPosition()}>
            <Triangle/>
            <Body>
                <Scroll>
                    {this.state.products.map(item => (<OrderItem item={item}/>))}
                </Scroll>
                <OrderTotalPrice price={this.state.price}/>
                <Button onClick={()=>{this.props.history.push("/checkout")}} style={{"margin-top":"10px"}}>Checkout</Button>
            </Body>
        </Box>
        );
    }
}

export default withRouter(Basket);

