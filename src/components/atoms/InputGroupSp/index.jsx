import React, { useContext } from 'react'


const InputGroupSp = ({ label, data_sp,  ...rest }) => {
    return (
        <>
            <div class="form-group">
                <label>{label}</label>
                <select class="custom-select form-control-border text-uppercase" {...rest}>
                    <option>Pilih Sp...</option>
                    {data_sp && (
                      data_sp.map(op => (
                            <option value={op._id} className="text-uppercase" >{op.no_sp}</option>

                        ))
                    )}
                </select>
            </div>
        </>
    )
}

export default InputGroupSp
