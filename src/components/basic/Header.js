import React from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";
import Icon from '@mdi/react';
import Input from "components/basic/Input";
import { withRouter } from "react-router-dom"
import {
    mdiFaceProfile,
    mdiLogoutVariant,
    mdiCart,
    mdiTextBoxMultiple
} from '@mdi/js';

const StyledHeader = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 16px 32px;
   background: #F9FCFE;
   box-sizing: border-box;
`;

const Title = styled.div`
    margin-right: auto;
    font-family: FuturaBold, sans-serif;
    font-size: 36px;
    color: #DEE5EA;
    flex: 1;
`;

const StyledInput = styled(Input)`
    flex: 3;
    ${props => props.hide && "visibility: hidden;"};
`;

const Action = styled(Icon).attrs(props => ({
    size: 1.2,
    color: "#DEE5EA",
    ...props,
}))`
    margin-right: 2px;
    cursor: pointer;
    &:hover path {
        fill: #c2cfd9 !important;
    }
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
`;

function Header(props) {
    async function logout() {
        try {
            await firebase.auth().signOut();
            props.history.push('/login');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <StyledHeader className={props.className}>
            <Title>Geoff</Title>

            <StyledInput onInput={props.onInput} hide={props.hideInput} placeholder="Type here to search"/>

            <Actions>
                <Action path={mdiCart} size={1.8}/>
                <Action path={mdiTextBoxMultiple}/>
                <Action path={mdiFaceProfile}/>
                <Action path={mdiLogoutVariant} onClick={logout}/>
            </Actions>
        </StyledHeader>
    );
}

export default withRouter(Header);
