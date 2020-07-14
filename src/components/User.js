import React, {Component} from "react";
import styled from "styled-components";
import Card from "components/basic/Card"
import Button from "components/basic/Button";
import {withRouter} from "react-router-dom"
import firebase from "firebase.js";
import Wrapper from "components/Wrapper";
import Popup from "./basic/Popup";
import Loader from "./basic/Loader";
import LabeledInput from "./basic/LabeledInput";
import PaymentEdit from "./basic/PaymentEdit";
import Auth from "controller/Auth";
import Validation from "controller/Validation";
import {setLoading} from "App";

const auth = Auth.getInstance();

const BoldText = styled.p`
    font-family: FuturaBold, sans-serif;
    font-weight: bold;
    color: #A4BBCD;
    font-size: 24px;
`;

const Container = styled.div`
    min-width: 700px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
`

const Background = styled(Card)`
    min-width: 700px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
`

const LoyaltyCard = styled(Card)`
    height: 90px;
    width: 200px;
    background: linear-gradient(-90deg, #00e74e, #6BE595);
    font-family: FuturaBold, sans-serif;
    font-weight: bold;
    font-size: 20px;
    padding:24px;
    border-radius: 5px;
    text-align: left;
    color: #fafdff;
`

const PaymentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
`

const UserInformation = styled.div`
    min-width: 400px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    margin:0;
    justify-content: space-between;
`

const StyledLabeledInput = styled(LabeledInput)`
    margin-top:20px;
`;

const PopUpContainer = styled(Card)`
    min-width: 500px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    
`

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialLoaded: false,

            paymentMethods: [],
            preferredPaymentMethod: null,

            modalCard: false,
            modalPayPal: false,

            name: null,
            surname: null,
            city: null,
            address: null,
            cap: null,
            phone: null,

            card: {
                number: {str: "", valid: false, touched: false},
                cvv: {str: "", valid: false, touched: false},
                expirationDate: {str: "", valid: false, touched: false},
            },

            paypal: {
                email: {str: "", valid: false, touched: false},
                password: {str: "", valid: false, touched: false},
            },
        };
    }

    async setDefaultPaymentMethod(id) {
        await firebase.firestore().doc(`/users/${auth.user.email}`).update({
            preferredPaymentMethod: id
        });
    }

    async deletePaymentMethod(id) {
        await firebase.firestore().doc(`/users/${auth.user.email}/paymentMethods/${id}`).delete();
    }

    removeListeners = [];

    componentDidMount() {
        setLoading(true);

        const promises = [];
        const resolvers = [];

        promises.push(new Promise(resolve => {
            resolvers.push(resolve)
        }));
        promises.push(new Promise(resolve => {
            resolvers.push(resolve)
        }));

        this.removeListeners.push(firebase.firestore().doc(`/users/${auth.user.email}`).onSnapshot(snap => {
            const user = snap.data();

            this.setState({
                preferredPaymentMethod: user.preferredPaymentMethod,

                loyaltyCard: user.loyaltyCard,

                name: {str: user.name, valid: true},
                surname: {str: user.surname, valid: true},
                city: {str: user.city, valid: true},
                address: {str: user.address, valid: true},
                cap: {str: user.cap, valid: true},
                phone: {str: user.phone, valid: true},
            });

            resolvers[0]();
        }));

        this.removeListeners.push(firebase.firestore().collection(`/users/${auth.user.email}/paymentMethods`).onSnapshot(snap => {
            this.setState({
                paymentMethods: snap.docs.map(doc => ({id: doc.id, ...doc.data()})),
            });

            resolvers[1]();
        }));

        Promise.all(promises).then(() => {
            this.setState({initialLoaded: true});
            setLoading(false);
        });
    }

    componentWillUnmount() {
        for (const removeListener of this.removeListeners) {
            removeListener();
        }
    }

    methodClick = async (id, action) => {
        if (action === "set") {
            await this.setDefaultPaymentMethod(id);
        } else if (action === "remove") {
            await this.deletePaymentMethod(id);
        }
    }

    updateUser = async () => {
        await firebase.firestore().doc(`/users/${auth.user.email}`).update({
            name: this.state.name.str,
            surname: this.state.surname.str,
            city: this.state.city.str,
            address: this.state.address.str,
            cap: this.state.cap.str,
            phone: this.state.phone.str,
        });
    }

    requireLoyaltyCard = async () => {
        await firebase.firestore().doc(`/users/${auth.user.email}`).update({
            loyaltyCard: {
                points: 0,
                number: Math.floor(Math.random() * (999999999)),
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            },
        });
    }

    addCard = async () => {
        firebase.firestore().collection(`/users/${auth.user.email}/paymentMethods`).add(
            {
                type: "card",
                cvv: this.state.card.cvv.str,
                number: this.state.card.number.str,
                expirationDate: this.state.card.expirationDate.str,
            },
        )

        this.setState({modalCard: false});
    }

    addPaypal = async () => {
        firebase.firestore().collection(`/users/${auth.user.email}/paymentMethods`).add(
            {
                type: "paypal",
                email: this.state.paypal.email.str,
                password: this.state.paypal.password.str,
            }
        )

        this.setState({modalPayPal: false});
    }

    render() {
        if (!this.state.initialLoaded) return (<div/>);

        const userInfoValidators = {
            name: Validation.nonEmptyString,
            surname: Validation.nonEmptyString,
            city: Validation.nonEmptyString,
            address: Validation.nonEmptyString,
            cap: Validation.cap,
            phone: Validation.phone,
        };

        const userInfoValidated = field => ({
            value: this.state[field].str,
            invalid: !this.state[field].valid,
            label: field,
            onChange: e => {
                const val = e.target.value;
                this.setState(state => {
                    state[field] = {
                        str: val,
                        valid: userInfoValidators[field](val),
                    }

                    return state;
                });
            },
        });

        const userInfoValid = Validation.allValid(this.state, ["name", "surname", "city", "address", "cap", "phone"]);

        return (
            <Wrapper hideInput={true}>
                <Container>
                    <BoldText style={{paddingLeft: "20px", margin: "0px", fontSize: "36px"}}>
                        {this.state.name.str} {this.state.surname.str}
                    </BoldText>

                    <Background>
                        <BoldText>Loyality card</BoldText>
                        {this.state.loyaltyCard ? (
                            <LoyaltyCard>
                                <div>
                                    {this.state.name.str} {this.state.surname.str}
                                    <p style={{
                                        fontSize: "36px",
                                        margin: "0"
                                    }}>{this.state.loyaltyCard.points ? (Math.floor(this.state.loyaltyCard.points / 100)) : (0)} pt</p>
                                    <p style={{textAlign: "right"}}>Geoff</p>
                                </div>
                            </LoyaltyCard>
                        ) : (
                            <Button onClick={() => this.requireLoyaltyCard()}>Require card</Button>
                        )}


                        <BoldText>Personal Information</BoldText>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <UserInformation style={{marginTop: "-20px"}}>
                                <StyledLabeledInput {...userInfoValidated("name")}/>
                                <StyledLabeledInput {...userInfoValidated("city")}/>
                                <StyledLabeledInput {...userInfoValidated("cap")}/>
                            </UserInformation>

                            <UserInformation style={{marginTop: "-20px", marginLeft: "20px"}}>
                                <StyledLabeledInput {...userInfoValidated("surname")}/>
                                <StyledLabeledInput {...userInfoValidated("address")}/>
                                <StyledLabeledInput {...userInfoValidated("phone")}/>
                            </UserInformation>
                        </div>
                        <Button style={{marginTop: "20px"}} onClick={() => this.updateUser()}
                                disabled={!userInfoValid}>Update</Button>

                        <BoldText>Payment Methods</BoldText>
                        <PaymentsContainer>
                            {
                                this.state.paymentMethods.map(method => (
                                    <PaymentEdit method={method}
                                                 isDefault={this.state.preferredPaymentMethod === method.id}
                                                 click={this.methodClick}/>
                                ))
                            }
                        </PaymentsContainer>

                        <ButtonContainer>
                            <Button style={{width: "100%", marginRight: "20px"}}
                                    onClick={() => (this.setState({modalCard: true}))}>Add card</Button>
                            <Button style={{width: "100%", marginLeft: "20px"}}
                                    onClick={() => (this.setState({modalPayPal: true}))}>Add PayPal</Button>
                        </ButtonContainer>

                        <Popup open={this.state.modalCard} onClose={() => (this.setState({modalCard: false}))}>
                            <PopUpContainer>
                                <StyledLabeledInput label={"number"}
                                                    invalid={!this.state.card.number.valid && this.state.card.number.touched}
                                                    value={this.state.card.number.str}
                                                    onChange={e => {
                                                        const val = e.target.value;
                                                        this.setState(state => {
                                                            state.card.number = {
                                                                str: val,
                                                                touched: true,
                                                                valid: Validation.nonEmptyString(val),
                                                            }
                                                            return state;
                                                        });
                                                    }}
                                                    onBlur={() => {
                                                        this.setState(state => {
                                                            state.card.number.touched = true;
                                                            return state;
                                                        });
                                                    }}/>

                                <ButtonContainer>
                                    <div style={{width: "100%", marginRight: "20px"}}>
                                        <StyledLabeledInput label={"cvv"} value={this.state.card.cvv.str}
                                                            invalid={!this.state.card.cvv.valid && this.state.card.cvv.touched}
                                                            onChange={e => {
                                                                const val = e.target.value;
                                                                this.setState(state => {
                                                                    state.card.cvv = {
                                                                        str: val,
                                                                        touched: true,
                                                                        valid: Validation.nonEmptyString(val),
                                                                    }
                                                                    return state;
                                                                });
                                                            }}
                                                            onBlur={() => {
                                                                this.setState(state => {
                                                                    state.card.cvv.touched = true;
                                                                    return state;
                                                                });
                                                            }}/>
                                    </div>
                                    <div style={{width: "100%", marginLeft: "20px"}}>
                                        <StyledLabeledInput style={{width: "100%"}} label={"expiry date"}
                                                            value={this.state.card.expirationDate.str}
                                                            invalid={!this.state.card.expirationDate.valid && this.state.card.expirationDate.touched}
                                                            onChange={e => {
                                                                const val = e.target.value;
                                                                this.setState(state => {
                                                                    state.card.expirationDate = {
                                                                        str: val,
                                                                        touched: true,
                                                                        valid: Validation.nonEmptyString(val),
                                                                    }
                                                                    return state;
                                                                });
                                                            }}
                                                            onBlur={() => {
                                                                this.setState(state => {
                                                                    state.card.expirationDate.touched = true;
                                                                    return state;
                                                                });
                                                            }}/>
                                    </div>
                                </ButtonContainer>

                                <Button
                                    disabled={!this.state.card.number.valid || !this.state.card.cvv.valid || !this.state.card.expirationDate.valid}
                                    onClick={() => (this.addCard())}>Add credit card</Button>
                            </PopUpContainer>
                        </Popup>

                        <Popup open={this.state.modalPayPal} onClose={() => (this.setState({modalPayPal: false}))}>
                            <PopUpContainer>
                                <StyledLabeledInput label={"email"}
                                                    invalid={!this.state.paypal.email.valid && this.state.paypal.email.touched}
                                                    value={this.state.paypal.email.str}
                                                    onChange={e => {
                                                        const val = e.target.value;
                                                        this.setState(state => {
                                                            state.paypal.email = {
                                                                str: val,
                                                                touched: true,
                                                                valid: Validation.email(val),
                                                            }
                                                            return state;
                                                        });
                                                    }}
                                                    onBlur={() => {
                                                        this.setState(state => {
                                                            state.paypal.email.touched = true;
                                                            return state;
                                                        });
                                                    }}
                                />
                                <StyledLabeledInput style={{width: "100%"}} label={"password"}
                                                    invalid={!this.state.paypal.password.valid && this.state.paypal.password.touched}
                                                    value={this.state.paypal.password.str}
                                                    onChange={e => {
                                                        const val = e.target.value;
                                                        this.setState(state => {
                                                            state.paypal.password = {
                                                                str: val,
                                                                touched: true,
                                                                valid: Validation.nonEmptyString(val),
                                                            }
                                                            return state;
                                                        });
                                                    }}
                                                    onBlur={() => {
                                                        this.setState(state => {
                                                            state.paypal.password.touched = true;
                                                            return state;
                                                        });
                                                    }}
                                />
                                <Button style={{marginTop: "40px"}}
                                        disabled={!this.state.paypal.email.valid || !this.state.paypal.password.valid}
                                        onClick={() => (this.addPaypal())}>Add paypal</Button>
                            </PopUpContainer>
                        </Popup>
                    </Background>
                </Container>
            </Wrapper>
        );
    }
}

export default withRouter(User)
