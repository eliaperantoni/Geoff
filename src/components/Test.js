import React from "react";
import { withRouter } from "react-router-dom"
import Basket from "components/basic/Basket.js";
import Wrapper from "components/Wrapper";


function Test(props) {
    return (
         <Basket></Basket>
    );
}
export default withRouter(Test)
