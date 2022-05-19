import React, { useContext } from 'react'
import CustomerContext from '../../../context/CustomerContext'


const InputGroupCustomer = ({ label, ...rest }) => {
    const { allcustomer } = useContext(CustomerContext)
    return (
        <>
            <div class="form-group">
                <label>{label}</label>
                <select class="custom-select form-control-border text-uppercase" {...rest}>
                    <option>Pilih Customer...</option>
                    {allcustomer && (
                        allcustomer.map(op => (
                            <option value={op._id} className="text-uppercase" >{op.customer_name}</option>

                        ))
                    )}
                </select>
            </div>
        </>
    )
}

export default InputGroupCustomer
