import React from 'react';
import styled from 'styled-components';
import Card from 'components/basic/Card.js';
import Button from 'components/basic/Card.js';

const Container = styled(Card)`
    display: flex;
    flex-direction: column;
    background-position: center center;
    max-width: 500px;
    max-heigth: 500px;
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

const Divider = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: right;
`;

function Detail(props) {
    return (
        <Container>
            <img src={avocado}></img>
            <Divider>
                <div>
                    <Bold>{props.title}</Bold>
                    <Text>{props.price}</Text>
                    <Text>{props.brand}</Text>
                    {/* TAG temporaneo */}
                    <Text>{props.tags}</Text>
                </div>

                <div>
                    <Button>Add to cart</Button>
                </div>
            </Divider>
        </Container>
    )
}

export default Detail;