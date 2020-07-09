import React from "react";
import styled from "styled-components";

import Item from "components/Item";
import Wrapper from "components/Wrapper";

const StyledCatalogue = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    grid-auto-flow: row;
    grid-gap: 18px;
`;

export default function Catalogue(props) {
    return (
        <Wrapper>
            <StyledCatalogue>
                {Array(25).fill((<Item price={2200} name="Avocado" image="https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"/>))}

            </StyledCatalogue>
        </Wrapper>
    );
}
