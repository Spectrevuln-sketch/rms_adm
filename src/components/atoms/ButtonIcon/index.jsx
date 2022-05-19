import React from 'react'

const ButtonIcon = ({ icon, ...rest }) => {
    return (
        <>
            <button {...rest} >
                {icon}
            </button>
        </>
    )
}

export default ButtonIcon
