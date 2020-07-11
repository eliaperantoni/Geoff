import React from 'react';
import styled from 'styled-components';
import Card from 'components/basic/Card.js';
import Price from 'components/basic/Price.js';
import Tag from 'components/basic/Tag.js';
import IconButton from "components/basic/IconButton";
import Input from "components/basic/Input";

import {mdiCart} from "@mdi/js";

const StyledDetail = styled(Card)`
    display: flex;
    flex-direction: column;
    height: 600px;
    width: 800px;
    padding: 0;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 48px 56px;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    
    > * {
        margin-bottom: 4px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const Name = styled.div`
    font-family: FuturaBold, sans-serif;
    color: #6C7C89;
    font-size: 2rem;
`;

const Brand = styled.div`
    font-family: FuturaLight, sans-serif;
    color: #B2BDC6;
    font-size: 1.6rem;
    font-style: italic;
`;

const Tags = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 14px;
    
    > * {
        margin-right: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const StyledPrice = styled(Price)`
    font-family: FuturaLight, sans-serif;
    color: #B2BDC6;
    font-size: 1.6rem;
`;

const Image = styled.div`
    flex: 1;
    background: url("${props => props.image}");
    border-radius: 24px 24px 0 0;
    background-size: cover;
    background-position: center;
`;

const StyledAddToCart = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const QuantityInput = styled(Input).attrs(props => ({
    type: "number",
    min: 1,
}))`
    width: 128px;
    margin-right: -24px;
`;


function AddToCart({quantity, onQuantityChange, onAddToCart}) {
    return (
        <StyledAddToCart>
            <QuantityInput value={quantity} onChange={e => onQuantityChange(parseInt(e.target.value.replace(/\D/,'')))}/>
            <IconButton icon={mdiCart} size={1.8} onClick={onAddToCart}/>
        </StyledAddToCart>
    );
}

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
        }
    }

    onQuantityChange = quantity => {
        this.setState({quantity});
    }

    onAddToCart = () => {
        console.log("ADD TO CART");
    }

    render() {
        const {item} = this.props;

        return (
            <StyledDetail>
                <Image image={item.image}/>
                <Content>
                    <Info>
                        <Name>{item.name}</Name>
                        <StyledPrice price={item.price}/>
                        <Brand>{item.brand}</Brand>
                        <Tags>
                            {item.tags.map(tag => (<Tag key={tag}>{tag}</Tag>))}
                        </Tags>
                    </Info>
                    <AddToCart quantity={this.state.quantity} onQuantityChange={this.onQuantityChange} onAddToCart={this.onAddToCart}/>
                </Content>
            </StyledDetail>
        );
    }
}
