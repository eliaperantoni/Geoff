import React from "react";
import Input from "components/basic/Input";
import Labeled from "components/basic/Labeled";

import {omit} from "lodash";

export default function LabeledInput(props) {
    return (
        <Labeled label={props.label} className={props.className}>
            <Input {...omit(props, ["className", "label"])}/>
        </Labeled>
    );
}
