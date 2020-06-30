import React from "react";
import styled from "styled-components";
import * as firebase from "firebase/app";
import Icon from '@mdi/react';
import Input from "components/basic/Input";
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
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
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
`;

const Action = styled(Icon).attrs(props => ({
    size: 1.2,
    color: "#DEE5EA",
    ...props,
}))`
    margin-right: 2px;
    cursor: pointer;
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
`;

function Header(props) {
    const {history} = props;

    async function logout() {
        try {
            await firebase.auth().signOut();
            history.push('/path');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <StyledHeader>
            <Title>Geoff</Title>

            <StyledInput placeholder="Type here to search"/>

            <Actions>
                <Action path={mdiCart} size={1.8}/>
                <Action path={mdiTextBoxMultiple}/>
                <Action path={mdiFaceProfile}/>
                <Action path={mdiLogoutVariant} onClick={logout}/>
            </Actions>
        </StyledHeader>
    );
}

export default Header;
