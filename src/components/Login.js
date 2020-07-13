import React from "react";
import styled from "styled-components";
import firebase from "firebase.js";
import Card from "components/basic/Card"
import Button from "components/basic/Button";
import Input from "components/basic/Input";
import authenticationSVG from "img/authentication.svg";
import {withRouter} from "react-router-dom";
import {setLoading} from "../App";
import Auth from "controller/Auth";
import Validation from "controller/Validation";

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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {str: "", valid: false, touched: false},
            password: {str: "", valid: false, touched: false},
        }
    }

    onChange = field => e => {
        const str = e.target.value;

        const validation = {
            email: Validation.email,
            password: Validation.nonEmptyString,
        }

        this.setState(state => {
            state[field] = {
                str,
                touched: true,
                valid: validation[field](str),
            };

            return state;
        });
    }

    onBlur = field => () => {
        this.setState(state => {
            state[field].touched = true;

            return state;
        });
    }

    login = async () => {
        setLoading(true);
        const {email, password} = this.state;
        try {
            const auth = Auth.getInstance();
            await auth.login(email.str, password.str);
            if (auth.user.isAdmin) {
                this.props.history.push("/admin/catalogue");
            } else {
                this.props.history.push("/");
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false);
        }
    }

    goToRegister = () => {
        this.props.history.push("/register")
    }

    render() {
        const canLogin = this.state.email.valid && this.state.password.valid;

        return (
            <Container>
                <Form>
                    <Image src={authenticationSVG}/>
                    <Actions>
                        <Input placeholder="Email" value={this.state.email.str}
                               onChange={this.onChange("email")}
                               onBlur={this.onBlur("email")}
                               invalid={!this.state.email.valid && this.state.email.touched}/>
                        <Input type="password" placeholder="Password"
                               value={this.state.password.str}
                               onChange={this.onChange("password")}
                               onBlur={this.onBlur("password")}
                               invalid={!this.state.password.valid && this.state.password.touched}/>
                        <Button disabled={!canLogin} onClick={this.login}>Login</Button>
                        <Button onClick={this.goToRegister}>Don't have an account?</Button>
                    </Actions>
                </Form>
            </Container>
        );
    }
}

export default withRouter(Login);
