import React, {Component} from "react";
import styled from "styled-components";
import Button from "components/basic/Button.js"
import OrderItem from "components/OrderItem"
import Price from "components/basic/Price";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import Loader from "./Loader";

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
    margin-top: -60px;
    margin-left:220px;
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
            loading: true,
            checkout:false,
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
    async getUserBasket(email) {
        const query = await firebase.firestore().collection(`users`).doc(email).get();
        if(!query.exists){
            alert("empty");
        }else{
            return query.data().basket;
        }
    }

    async componentDidMount() {
        let email = await this.getUserEmail();
        let basket =  await this.getUserBasket(email);
        let basketItems = [];
        let price = 0;

        for (const obj of basket){

            const doc = await firebase.firestore().doc(`/items/${obj.itemID}`).get();
            let item = {...doc.data(), quantity: obj.quantity, itemID:obj.itemID}
            basketItems.push(item);
            price += item.quantity * item.price;
        }
        this.setState({products:basketItems,price:price,loading:false,checkout:!basket.length>0});
    }

    setPosition(){
            return {position:"absolute",
                    left: this.props.x,
                    top: this.props.y,
            }
        }

    basketChange = async()=>{
        let email = await this.getUserEmail();
        let basket =  await this.getUserBasket(email);
        let basketItems = [];
        let price = 0;
        this.setState({loading:true});
        for (const obj of basket){
            const doc = await firebase.firestore().doc(`/items/${obj.itemID}`).get();
            let item = {...doc.data(), quantity: obj.quantity, itemID:obj.itemID}
            basketItems.push(item);
            price += item.quantity * item.price;
        }
        this.setState({products:basketItems,price:price,loading:false});
    }
    render(){
        return(
            <Box style={this.setPosition()}>
                {this.state.loading ?(
                <p style={{marginLeft: "120px", marginTop:"100px"}}>
                    <Loader loading={this.state.loading}/>
                </p>
                ):(
                <Body>
                    <Triangle/>
                    <Scroll>
                        {this.state.products.map(item => (<OrderItem handler={this.basketChange} item={item} quantity={item.quantity}/>))}
                    </Scroll>
                    <OrderTotalPrice price={this.state.price}/>
                    <Button disabled = {this.state.checkout} onClick={()=>{this.props.history.push("/checkout")}} style={{"margin-top":"10px"}}>Checkout</Button>
                </Body>)
                }


            </Box>
            );
    }
}
//
export default withRouter(Basket);

