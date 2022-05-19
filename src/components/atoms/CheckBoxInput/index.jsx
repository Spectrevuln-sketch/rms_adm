import React from 'react'

const CheckBoxInput = () => {
    return (
        <>
            <div className="form-group row">
                <div className="offset-sm-2 col-sm-10">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                        <label className="form-check-label" htmlFor="exampleCheck2">Remember me</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckBoxInput
