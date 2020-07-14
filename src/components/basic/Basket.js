import React, {Component} from "react";
import styled from "styled-components";
import Button from "components/basic/Button.js"
import OrderItem from "components/OrderItem"
import Price from "components/basic/Price";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import Loader from "./Loader";
import Auth from "controller/Auth";

const auth = Auth.getInstance();

const Box =  styled.div`
    margin-left: 50px;
    margin-top:40px;
    height: 400px;
    width: 350px;
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
    width: 300px;
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
    width: 300px;
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
            cacheItem:[],
        };
    }

    listenerRemover;
    async componentDidMount() {

        this.setState({loading:true});

        this.listenerRemover = firebase.firestore().doc(`/users/${auth.user.email}`).onSnapshot(async snap =>  {
            this.setState({loading:true});
            const user = snap.data();
            const basket = user.basket;
            const products = []
            let price = 0;
            for (const obj of basket){
                let ref = false;
                for (const item in this.state.cacheItem){
                    if(obj.itemID === item.itemID){
                        ref = item;
                        break;
                    }
                }
                if(!ref){
                    const doc = await firebase.firestore().doc(`/items/${obj.itemID}`).get();
                    let item = {...doc.data(), quantity: obj.quantity, itemID:obj.itemID}
                    this.state.cacheItem.push(item);
                    ref = item;
                }
                //elem contiene la referenza
                products.push(ref);
                price += ref.quantity * ref.price;
            }
            this.setState({
                products: products,
                loading:false,
                price:price,
                checkout: !products.length>0,
            });
        });
    }

    componentWillUnmount() {
        this.listenerRemover();
    }

    setPosition(){
            return {position:"absolute",
                    left: this.props.x,
                    top: this.props.y,
            }
        }

    basketChange = (element,value)=>{
        if(value === ""){
            value = -1;
        }
        const basket = this.state.products;
        basket.map((obj,index)=>{
            if(obj.itemID === element.itemID){
                if(value>0){
                    basket[index].quantity =  parseInt(value, 10);
                }else{
                    basket.splice(index,1);
                }
            }
        })
        firebase.firestore().collection('users').doc(auth.user.email).update({basket:basket});
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
                        {this.state.products.map(item => (<OrderItem onCh={(this.basketChange)} item={item} quantity={item.quantity}/>))}
                    </Scroll>
                    <OrderTotalPrice price={this.state.price}/>
                    <Button disabled = {this.state.checkout} onClick={()=>{this.props.history.push("/checkout")}} style={{marginTop:"10px"}}>Checkout</Button>
                </Body>)
                }
            </Box>
            );
    }
}
//
export default withRouter(Basket);

