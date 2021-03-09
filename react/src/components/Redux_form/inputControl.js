import React from "react";

export const input = ({
    input,
    type,
    placeholder,
    id,
classNameName,
    meta: { touched, error },
    ...rest
}) => {

    return (
        <div>
            <input className="form__input" {...input} type={type} placeholder={placeholder} id={id} />
            {touched && error && (
                <span style={{ fontSize: "15px", color: "red" }}>{error}</span>
            )}
        </div>
    );
};
