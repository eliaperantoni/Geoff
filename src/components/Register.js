import React, {useState} from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";

import Card from "components/basic/Card"
import Button from "components/basic/Button";
import Input from "components/basic/Input";
import { withRouter } from "react-router-dom"

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

function Register(props) {
	const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCPassword] = useState('');
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [city,setCity] = useState('');
    const [address,setAddress] = useState('');
    const [cap,setCap] = useState('');
    const [phone,setPhone] = useState('');
    return (
        <Container>
            <Form>
                <Upper>
                    <Input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <Input type="password" placeholder="Confirm Password" onChange={e => setCPassword(e.target.value)}/>
                    <Input placeholder="Name" onChange={e => setName(e.target.value)}/>
                    <Input placeholder="Surname" onChange={e => setSurname(e.target.value)}/>
                    <Input placeholder="City" onChange={e => setCity(e.target.value)}/>
                    <Input placeholder="Address" onChange={e => setAddress(e.target.value)}/>
                    <Input placeholder="CAP" onChange={e => setCap(e.target.value)}/>
                    <Input placeholder="Phone Number" onChange={e => setPhone(e.target.value)}/>
                    <Button onClick={register}>Register</Button>
                </Upper>
            </Form>
        </Container>
    );

    async function register(){
        try{
            await firebase.auth().createUserWithEmailAndPassword(email,password).then(
                ()=>{
                    firebase.firestore().collection('users').add({
                        email: email,
                        name:name,
                        surname:surname,
                        city: city,
                        address: address,
                        cap: cap,
                        phone:phone,
                        preferredPaymentMethod: "",
                        loyaltyCard: null,
                    });
                }).then(()=>{
                    props.history.push("/checkout");
                }).catch((err)=>{
                    alert(err.message);
            });
        }catch(error){
            alert(error.message)
        }
    }
}
export default withRouter(Register)
