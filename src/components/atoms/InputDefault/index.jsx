import React from 'react'

const InputDefault = ({ label, ...rest }) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1" className='fw-light'>{label}</label>
                <input className="form-control" {...rest} />
            </div>
        </>
    )
}

export default InputDefault
