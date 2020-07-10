import React from 'react';
import styled, {css} from 'styled-components';
import {mdiCart, mdiClose} from "@mdi/js";

import Card from 'components/basic/Card.js';
import IconButton from 'components/basic/IconButton.js';
import Price from 'components/basic/Price.js';

const StyledItem = styled(Card)`
    display: flex;
    flex-direction: column;
    height: 200px;
    width: 300px;
    padding: 0;

    ${props => props.admin && css`
        height: 260px;
    `}
`;

const Info = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 22px 32px;
`;

const InfoCol = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.span`
    font-family: FuturaBold, sans-serif;
    font-size: 1.4rem;
    color: #6C7C89;
    margin-bottom: 4px;
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

function Item(props) {
    return (
        <StyledItem admin={props.admin}>
            <Image image={props.image}/>
            <Info>
                <InfoCol>
                    <Name>{props.name}</Name>
                    <StyledPrice price={props.price}/>
                    {props.admin && (<Stock>{props.stock}<span style={{fontSize: '1.4rem'}}> left</span></Stock>)}
                </InfoCol>
                {props.admin
                    ? (<IconButton type="danger" icon={mdiClose} onClick={props.onDelete}/>)
                    : (<IconButton type="primary" icon={mdiCart}/>)
                }
            </Info>
        </StyledItem>
    )
}

export default Item;