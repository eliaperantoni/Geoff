import React from "react";
import styled from "styled-components";

import Card from "components/basic/Card";

import confirmSVG from "img/confirm.svg";

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
    font-size: 28px;
    color: #AAB8C2;
`;

export default function () {
    return (

        <Container>
            <Form>
                <Image src={confirmSVG}/>
                <Upper>
                    <Title>Check your email!</Title>
                    <Par>We have sent you an email to confirm your account<br />. Click on the link and you’ll be redirected to the homepage</Par>
                </Upper>

            </Form>
        </Container>
    );
}
