import React, {useState} from "react";
import styled from "styled-components";
import firebase from "firebase.js";
import Card from "components/basic/Card"
import Button from "components/basic/Button";
import Input from "components/basic/Input";
import authenticationSVG from "img/authentication.svg";
import { withRouter } from "react-router-dom";
import {setLoading} from "../App";

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
    min-width: 400px;
    min-height: 550px; 
    background: #FAFDFF;
    margin-top:50px;
    border-radius: 24px;
    box-shadow: 0 2px 64px rgba(232,238,243,0.5);
    padding: 48px 36px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const Image = styled.img`
    max-width: 340px;
    max-height: 340px;
    margin-top: -140px;
`;

function Login(props) {
	const [email,setEmail] = useState('')
    const [password, setPassword] = useState('');
    async  function login() {
        setLoading(true);
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password);
            const user = await firebase.firestore().doc(`/users/${email}`).get();
            if(user.data().isAdmin) {
                props.history.push("/admin/catalogue");
            } else {
                props.history.push("/");
            }
        }catch(error){
            alert(error.message)
        } finally {
            setLoading(false);
        }
    }
    function register(){
        props.history.push("/register")
    }
    return (
        <Container>
            <Form>
                <Image src={authenticationSVG}/>
                <Actions>
                    <Input style={{'margin-top':'50px'}} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <Input style={{'margin-bottom':'50px'}} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <Button type="submit" onClick={login}>Login</Button>
                    <Button onClick={register}>Don't have an account?</Button>
                </Actions>
            </Form>
        </Container>
    );

}

export default withRouter(Login);
