import React, {useState} from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";

import Card from "components/basic/Card"
import Button from "components/basic/Button";
import Input from "components/basic/Input";

import authenticationSVG from "img/authentication.svg";

const Container = styled(Card)`
    min-width: 400px;
    min-height: 500px; 
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background:#E5E5E5;
    overflow: hidden;
`;

const Form = styled(Card)`
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align:center;
    min-width: 400px;
    min-height: 550px; 
    background: #FAFDFF;
    margin-top:50px;
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
  margin-top: 90px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: auto;
  flex-grow: 0.09;
`;

const Image = styled.img`
    max-width: 340px;
    max-height: 340px;
    margin-top: -140px;
`;

const Par = styled.p`
    margin-top:20px;
    font-family: FuturaLight, sans-serif;
    font-size: 22px;
`;

export default function (props) {
	const [email,setEmail] = useState('')
    const [password, setPassword] = useState('');
    return (
        <Container>
            <Form>
                <Image src={authenticationSVG}/>
                <Upper>
                <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Upper>
                <Bottom>
                    <Button
                        type="submit"
                        onClick={login}
                    >Login</Button>
                    <Button>Don't have an account?</Button>
                </Bottom>
                <Par>Forgot password ?</Par>
            </Form>
        </Container>
    );
    async  function login() {
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password);
            props.history.push(null, 'login');
        }catch(error){
            alert(error.message)
        }
    }
}

