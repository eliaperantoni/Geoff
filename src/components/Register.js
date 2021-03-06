import React from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";

import Card from "components/basic/Card"
import Button from "components/basic/Button";
import Input from "components/basic/Input";
import {withRouter} from "react-router-dom"
import Validation from "../controller/Validation";
import {setLoading} from "App";

const StyledRegister = styled(Card)`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 500px;
    
    > * {
        margin-bottom: 18px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {str: "", valid: false, touched: false},
            password: {str: "", valid: false, touched: false},
            confirmPassword: {str: "", valid: false, touched: false},
            name: {str: "", valid: false, touched: false},
            surname: {str: "", valid: false, touched: false},
            city: {str: "", valid: false, touched: false},
            address: {str: "", valid: false, touched: false},
            cap: {str: "", valid: false, touched: false},
            phone: {str: "", valid: false, touched: false},
        };
    }

    onChange = Validation.onChange({
        email: Validation.email,
        password: Validation.password,
        confirmPassword: Validation.all(Validation.password, Validation.exactly(() => this.state.password.str)),
        name: Validation.nonEmptyString,
        surname: Validation.nonEmptyString,
        city: Validation.nonEmptyString,
        address: Validation.nonEmptyString,
        cap: Validation.cap,
        phone: Validation.phone,
    }).bind(this);

    onBlur = Validation.onBlur.bind(this);

    register = async () => {
        const [
            email, password, name, surname, city, address, cap, phone
        ] = ["email", "password", "name", "surname", "city", "address", "cap", "phone"].map(f => this.state[f].str);

        try {
            setLoading(true);

            await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.auth().currentUser.sendEmailVerification();
            const userRef = firebase.firestore().doc(`/users/${email}`);
            await userRef.set({
                email: email,
                name: name,
                surname: surname,
                city: city,
                address: address,
                cap: cap,
                phone: phone,
                preferredPaymentMethod: null,
                loyaltyCard: null,
                basket: [],
                isAdmin: false,
            });
            const paymentMethod = await firebase.firestore().collection(`/users/${email}/paymentMethods`).add({
                type: "cash",
            });
            await userRef.update({
                preferredPaymentMethod: paymentMethod.id,
            });
            await firebase.auth().signOut();
            this.props.history.push("/confirm");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    render() {
        const validatedField = Validation.validatedField.bind(this);
        const canRegister = Validation.allValid(this.state, ["email", "password", "confirmPassword", "name", "surname", "city", "address", "cap", "phone"]);

        return (
            <StyledRegister>
                <Input placeholder="Email" {...validatedField("email")}/>
                <Input placeholder="Password" type="password" {...validatedField.call(this, "password")}/>
                <Input placeholder="Confirm Password"
                       type="password" {...validatedField.bind(this)("confirmPassword")}/>
                <Input placeholder="Name" {...validatedField.call(this, "name")}/>
                <Input placeholder="Surname" {...validatedField.call(this, "surname")}/>
                <Input placeholder="City" {...validatedField.call(this, "city")}/>
                <Input placeholder="Address" {...validatedField.call(this, "address")}/>
                <Input placeholder="CAP" {...validatedField.call(this, "cap")}/>
                <Input placeholder="Phone" {...validatedField.call(this, "phone")}/>
                <Button disabled={!canRegister} onClick={this.register}>Register</Button>
            </StyledRegister>
        );
    }
}

export default withRouter(Register)
