import React, {Component} from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";
import Icon from '@mdi/react';
import { withRouter } from "react-router-dom"
import Basket from "components/basic/Basket.js"
import Input from "components/basic/Input.js"
import Select from "components/basic/Select.js"
import {
    mdiFaceProfile,
    mdiLogoutVariant,
    mdiCart,
    mdiTextBoxMultiple
} from '@mdi/js';
import categories from "categories";
import Auth from "controller/Auth";

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

const InputContainer= styled.div`
    flex: 3;
    border-radius: 18px;
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(176,195,215,0.26);
    background: white;
    
    ${props => props.hide && "visibility: hidden;"};
    
    display: flex;
    flex-direction: row;
    align-items: center;
`;


const Divider = styled.div`
    align-self: stretch;
    width: 1px;
    background: rgba(132,156,177,0.24);
    box-sizing: border-box;
    margin: 14px 0 14px 14px;
`;

const StyledSelect = styled(Select)`
    border-radius: 18px 0 0 18px;
    box-shadow: none;
    font-size: 18px;
`;

const StyledInput = styled(Input)`
    border-radius: 0 18px 18px 0;
    box-shadow: none;
    flex: 1;
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
            const auth = Auth.getInstance();
            await auth.logout();
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

                <InputContainer hide={this.props.hideInput}>
                    <StyledSelect onChange={e => this.props.onCategory(e.target.value)}>
                        <option value={""}>All Categories</option>
                        {categories.map(c => (<option value={c.name} key={c.name}>{c.display}</option>))}
                    </StyledSelect>
                    <Divider/>
                    <StyledInput onChange={e => this.props.onSearch(e.target.value)} placeholder="Type here to search"/>
                </InputContainer>

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
