import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById('root');

export default class Overlay extends React.Component{
    el = document.createElement("div");

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal((<div>Ciao</div>), this.el);
    }
}
