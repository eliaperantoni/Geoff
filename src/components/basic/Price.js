import React from "react";

export default function Price({price, className}) {
    const integral = Math.floor(price / 100);
    const decimal = price % 100;

    return (
        <span className={className}>
            {integral}{decimal !== 0 && `.${decimal.toString().padStart(2, "0")}`} $
        </span>
    );
}
