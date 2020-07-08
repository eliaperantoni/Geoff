import React from 'react';
import styled from 'styled-components';
import Card from 'components/basic/Card.js';
import Button from 'components/basic/Card.js';

const Container = styled(Card)`
    display: flex;
    flex-direction: column;
    background-position: center center;
    max-width: 341px;
    max-heigth: 254px;
    background: black;
`;

const Divider = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Text = styled.p`
    font-family: FuturaLight, sans-serif;
    font-size: 24px;
    color: #A4BBCD;
    margin: 40px auto auto;
`;

const Bold = styled.p`
    font-family: FuturaBold, sans-serif;
    font-weight: bold;
    color: #A4BBCD;
`;

const Image = styled.img`
    flex: 1;
    align-self: stretch;
    min-heigth: 300px;
    max-width: 341px;
    margin: -48px -36px;
`;

function Item(props) {
    return (
        <Container>
            <Image src={props.image} />
            <Divider>
                <div>
                    <Bold>{props.title}</Bold>
                    <Text>{props.price}</Text>
                </div>
                <div>
                    <Button>Add to cart</Button>
                </div>
            </Divider>
        </Container>
    )
}

export default Item;