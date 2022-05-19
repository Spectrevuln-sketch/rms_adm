import React from 'react'
import { InputForm } from '../../../components'

const FormSection = () => {
    return (
        <>
            <form className="form-horizontal">
                <div className="card-body">
                    <InputForm label="" />
                    <InputForm label="" />


                </div>
                {/* /.card-body */}
                <div className="card-footer">
                    <button type="submit" className="btn btn-info">Sign in</button>
                    <button type="submit" className="btn btn-default float-right">Cancel</button>
                </div>
                {/* /.card-footer */}
            </form>
        </>
    )
}

export default FormSection
