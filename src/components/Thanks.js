import React, {Component} from "react";
import styled from "styled-components";

import Card from "components/basic/Card";
import Header from "components/basic/Header";
import thanksSVG from "img/thanks.svg";
import Wrapper from "./Wrapper";
import {withRouter} from "react-router-dom";

const Container = styled(Card)`
    min-width: 400px;
    min-height: 500px; 
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background:#f2f7fb;
    overflow: hidden;
`;

const Form = styled(Card)`
    margin-top:auto;
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align:center;
    width: 800px;
    min-height: 400px; 
    background: #FAFDFF;
    border-radius: 24px;
    box-shadow: 0 2px 64px rgba(232,238,243,0.5);
    padding: 48px 36px;
`;

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: auto;
  flex-grow: 0.2;
  margin-top: 75px;
`;

const Image = styled.img`
    max-width: 340px;
    max-height: 340px;
    margin-top: -140px;
`;

const Title = styled.p`
    font-family: FuturaBold, sans-serif;
    font-weight: 900;
    line-height: 38px;
    font-size: 48px;
    color: #859EB3;
    margin: 20px auto 30px auto;
`;

const Par = styled.p`
    margin-top:20px;
    font-family: FuturaLight, sans-serif;
    font-size: 48px;
    color: #AAB8C2;
`;

class Thanks extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { data } = this.props.location
        console.log(data)
        return (
            <Wrapper hideInput={true}>
                <Form>
                    <Image src={thanksSVG}/>
                    <Upper>
                        <Par>
                            <Title>Your order has been placed!</Title>
                            {data.order}
                        </Par>
                    </Upper>
                </Form>
            </Wrapper>
        );
    }

}
export default withRouter(Thanks);
