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
        const {email, password} = this.state;
        try {
            setLoading(true);

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
            <StyledLogin>
                <Image src={authenticationSVG}/>
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
                <Button onClick={this.goToRegister} type="secondary">Don't have an account?</Button>
            </StyledLogin>
        );
    }
}

export default withRouter(Login);
