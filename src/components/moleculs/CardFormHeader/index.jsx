import React from 'react'
import { ButtonIcon } from '../../../components'

const CardFromHeader = ({ label }) => {
    return (
        <>
            <div className="card-header">
                <h3 className="card-title">{label}</h3>
            </div>
        </>
    )
}

export default CardFromHeader
