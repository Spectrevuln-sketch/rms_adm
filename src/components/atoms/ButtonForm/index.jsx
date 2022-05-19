import React from 'react'

const ButtonForm = ({ label, ...rest }) => {
    return (
        <button {...rest} >{label}</button>
    )
}

export default ButtonForm
