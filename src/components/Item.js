import React from 'react';
import styled, {css} from 'styled-components';
import {mdiCart, mdiClose, mdiPlus} from "@mdi/js";

import Card from 'components/basic/Card.js';
import IconButton from 'components/basic/IconButton.js';
import Price from 'components/basic/Price.js';

const StyledItem = styled(Card)`
    display: flex;
    flex-direction: column;
    height: 240px;
    width: 300px;
    padding: 0;
    
    position: relative;
    
    ${props => !props.admin && css`
        cursor: pointer;
    `}

    ${props => props.admin && css`
        height: 300px;
    `}
    
    ${props => props.disabled && css`
        filter: saturate(20%) opacity(70%);
        pointer-events: none;
    `}
`;

const Info = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 22px 32px;
    
    > * {
        margin-bottom: 4px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const InfoCol = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.span`
    font-family: FuturaBold, sans-serif;
    font-size: 1.4rem;
    color: #6C7C89;
`;

const Brand = styled.span`
    font-family: FuturaLight, sans-serif;
    color: #B2BDC6;
    font-size: 1.2rem;
    font-style: italic;
`;

const Stock = styled.span`
    font-family: FuturaLight, sans-serif;
    font-size: 1.8rem;
    color: #A6AEB5;
    margin-top: 12px;
`;

const StyledPrice = styled(Price)`
    font-family: FuturaLight, sans-serif;
    font-size: 1.2rem;
    color: #B2BDC6;
`;

const Image = styled.div`
    flex: 1;
    background: url("${props => props.image}");
    border-radius: 24px 24px 0 0;
    background-size: cover;
    background-position: center;
`;

const Actions = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
    > * {
        margin-bottom: 12px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

function Item(props) {
    const item = props.item;

    return (
        <StyledItem admin={props.admin} disabled={props.disabled} onClick={e => {
            e.stopPropagation();
            if (props.onClick)
                props.onClick();
        }}>
            <Image image={item.image}/>
            <Info>
                <InfoCol>
                    <Name>{item.name}</Name>
                    <Brand>{item.brand}</Brand>
                    <StyledPrice price={item.price}/>
                    {props.admin && (<Stock>{item.stock}<span style={{fontSize: '1.4rem'}}> left</span></Stock>)}
                </InfoCol>
                <Actions>
                    {props.admin
                        ? (
                            <React.Fragment>
                                <IconButton type="primary" icon={mdiPlus} onClick={props.onAddStock}/>
                                <IconButton type="danger" icon={mdiClose} onClick={props.onDelete}/>
                            </React.Fragment>
                        )
                        : (<IconButton type="primary" icon={mdiCart} onClick={props.onAddToCart}/>)
                    }
                </Actions>
            </Info>
        </StyledItem>
    )
}

export default Item;