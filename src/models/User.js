import React from 'react';
import firebase from "firebase.js";

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            isAdmin: false,
            name: "",
            surname:"",
            city:"",
            address:"",
            cap:"",
            phone:"",
            preferredPaymentMethod:"",
            loyaltyCard:null
        }
    };
    render() {
        return (
            <p>this.state.name</p>
        );
    }
}
export default User;
