import React from "react";
import styled from "styled-components";
import Card from "components/basic/Card"
import Button from "components/basic/Button";
import Input from "components/basic/Input";
import authenticationSVG from "img/authentication.svg";
import {withRouter} from "react-router-dom";
import {setLoading} from "App";
import Auth from "controller/Auth";
import Validation from "controller/Validation";
import * as firebase from "firebase";

const StyledLogin = styled(Card)`
    margin: auto;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    
    > * {
        margin-bottom: 18px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const Image = styled.img`
    width: 400px;
    height: 400px;
    align-self: center;
    margin-top: -200px;
`;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {str: "", valid: false, touched: false},
            password: {str: "", valid: false, touched: false},
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.onKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.onKeyDown);
    }

    onKeyDown = e => {
        if(e.key === "Enter" && this.canLogin()) this.login();
    }

    onChange = Validation.onChange({
        email: Validation.email,
        password: Validation.password,
    }).bind(this);

    onBlur = Validation.onBlur.bind(this);

    login = async () => {
        const {email, password} = this.state;
        try {
            setLoading(true);
            const auth = Auth.getInstance();
            await auth.login(email.str, password.str);

            if(!auth.user.isAdmin && !auth.user.emailVerified) {
                await auth.logout();
                this.props.history.push("/confirm");
                return;
            }

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

    canLogin = () => Validation.allValid(this.state, ["email", "password"]);

    render() {
        const validatedField = Validation.validatedField.bind(this);

        return (
            <StyledLogin>
                <Image src={authenticationSVG}/>
                <Input placeholder="Email" {...validatedField("email")}/>
                <Input placeholder="Password" type="password" {...validatedField("password")}/>
                <Button disabled={!this.canLogin()} onClick={this.login}>Login</Button>
                <Button onClick={this.goToRegister} type="secondary">Don't have an account?</Button>
            </StyledLogin>
        );
    }
}

export default withRouter(Login);
