import React, {useState} from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";

import Card from "components/basic/Card"
import Button from "components/basic/Button";
import Input from "components/basic/Input";

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
    border-radius: 24px;
    box-shadow: 0 2px 64px rgba(232,238,243,0.5);
    padding: 48px 36px;
`;

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  > * {
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0;
    }
  }
`;

export default function (props) {
	const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCPassword] = useState('');
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [city,setCity] = useState('');
    const [address,setAddress] = useState('');
    const [cap,setCap] = useState('');
    return (
        <Container>
            <Form>
                <Upper>
                    <Input placeholder="Email"/>
                    <Input placeholder="Password"/>
                    <Input placeholder="Confirm Password"/>
                    <Input placeholder="Name"/>
                    <Input placeholder="Surname"/>
                    <Input placeholder="City"/>
                    <Input placeholder="Address"/>
                    <Input placeholder="CAP"/>
                    <Input placeholder="Phone Number"/>
                    <Button>Register</Button>
                </Upper>
            </Form>
        </Container>
    );
    async function Register(){
        try{
            await firebase.auth().createUserWithEmailAndPassword(email,password)
            //TODO
        }catch(error){
            alert(error.message)
        }
    }
}
