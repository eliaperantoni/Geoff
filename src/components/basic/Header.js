import React, {Component} from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";
import Icon from '@mdi/react';
import Input from "components/basic/Input";
import { withRouter } from "react-router-dom"
import Basket from "components/basic/Basket.js"
import {
    mdiFaceProfile,
    mdiLogoutVariant,
    mdiCart,
    mdiTextBoxMultiple
} from '@mdi/js';

const StyledHeader = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 16px 32px;
   background: #F9FCFE;
   box-sizing: border-box;
`;

const Title = styled.div`
    margin-right: auto;
    font-family: FuturaBold, sans-serif;
    font-size: 36px;
    color: #DEE5EA;
    flex: 1;
    cursor: pointer;
`;

const StyledInput = styled(Input)`
    flex: 3;
    ${props => props.hide && "visibility: hidden;"};
`;

const Action = styled(Icon).attrs(props => ({
    size: 1.2,
    color: "#DEE5EA",
    ...props,
}))`
    margin-right: 2px;
    cursor: pointer;
    &:hover path {
        fill: #c2cfd9 !important;
    }
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
`;

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showBasket:false,

        };
    }
    logout =  async()=> {
        try {
            await firebase.auth().signOut();
            this.props.history.push('/login');
        } catch (error) {
            alert(error.message);
        }
    }
    main =  async()=> {
        this.props.history.push("/")
    }
    orders =  async()=> {
        this.props.history.push("/orders");
    }
    basket = ()=> {
        this.setState({showBasket:!this.state.showBasket});
    }
    showBasket = ()=>{
        if(this.state.showBasket){
            let rec = document.getElementById(1).getBoundingClientRect();
            return <Basket x={-395+rec.left +window.scrollX} y={rec.top+ window.scrollY+25}></Basket>
        }
    }

    handleResize= (WindowSize, event)=> {
        this.setState({showBasket:this.state.showBasket});
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    render() {
        return (
            <StyledHeader className={this.props.className}>
                <Title onClick={this.main}>Geoff</Title>
                <StyledInput onInput={this.props.onInput} hide={this.props.hideInput} placeholder="Type here to search"/>

                <Actions>
                    <Action path={mdiCart} size={1.8} onClick={this.basket}/>
                    <Action path={mdiTextBoxMultiple} onClick={this.orders}/>
                    <Action path={mdiFaceProfile}/>
                    <Action id="1" path={mdiLogoutVariant} onClick={this.logout}/>
                </Actions>
                {this.showBasket()}
            </StyledHeader>
        );
    }
}
export default withRouter(Header);
