import React from "react";
import styled from "styled-components";

const Header = styled.div`
  width:100%;
  height: 256px;
  background: red;
`;

const Footer = styled.div`
  width:100%;
  height: 256px;
  background: blue;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function Empty(props) {
    return (
        <Wrapper>
            <Header/>
            {props.children}
            <Footer/>
        </Wrapper>
    );
}
