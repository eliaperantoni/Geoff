import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

export default function Loader({loading}) {
    return (
        <PuffLoader loading={loading} size={50} color={"#6C7C89"}/>
    );
}
