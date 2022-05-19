import React from 'react'

const InputForm = ({ label, ...rest }) => {
    return (
        <>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">{label}</label>
                <div className="col-sm-10">
                    <input {...rest} className="form-control" />
                </div>
            </div>
        </>
    )
}

export default InputForm
