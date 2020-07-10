import React from 'react';
import styled from 'styled-components';
import Card from 'components/basic/Card.js';
import Button from 'components/basic/Card.js';

const StyledDetail = styled(Card)`
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 600px;
    padding: 0;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding: 36px 48px;
`;

const Name = styled.div`
    font-family: FuturaBold, sans-serif;
    color: #6C7C89;
    font-size: 2rem;
`;

const Image = styled.div`
    flex: 1;
    background: url("${props => props.image}");
    border-radius: 24px 24px 0 0;
    background-size: cover;
    background-position: center;
`;

function Detail({item}) {
    return (
        <StyledDetail>
            <Image image={item.image}/>
            <Info>
                <Name>{item.name}</Name>
            </Info>
        </StyledDetail>
    )
}

export default Detail;