import React, { useContext } from 'react'
import ArmadaContext from '../../../context/ArmadaContext'


const InputGroupArmada = ({ label, ...rest }) => {
    const { allArmada } = useContext(ArmadaContext)
    return (
        <>
            <div class="form-group">
                <label>{label}</label>
                <select class="custom-select form-control-border text-uppercase" {...rest}>
                    <option>Pilih Armada...</option>
                    {allArmada && (
                        allArmada.map(op => (
                            <option value={op._id} className="text-uppercase" >{op.via}</option>

                        ))
                    )}
                </select>
            </div>
        </>
    )
}

export default InputGroupArmada
