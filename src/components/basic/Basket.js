import React from "react";
import styled from "styled-components";
import Button from "components/basic/Button.js"
const Box =  styled.div`
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
    margin-top: -40px;
    margin-right:20px;
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
    padding:22px
`
function Basket(props) {

    return (
        <Box>
            <Triangle></Triangle>
            <Body>

                <Button>Checkout</Button>
            </Body>
        </Box>
    );
}

export default Basket;
