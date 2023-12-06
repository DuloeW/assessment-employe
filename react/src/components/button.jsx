import * as React from 'react';

const BasicButtons = ({caption, style, type, buttonClick  =function() {}, employee}) => {

    const handleClick = (id) => {
        buttonClick(id)
    }

    return (
        <button style={style} type={type} onClick={() => handleClick(employee)}>{caption}</button>
    );
}

export default BasicButtons
