import React from 'react';
import Empty from "./components/basic/Empty";
import Login from "./components/Login"
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 128px;
  flex: 1;
  
  > * {
    margin-bottom: 24px;
  }
`;

function App() {
    return (
        <Login>

        </Login>
    );
}

export default App;
