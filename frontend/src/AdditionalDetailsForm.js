import React from "react"
import {
    TextInput,
    NumberInput,
    ParaInput
} from './Inputs';

export const AdditionalDetailsForm = ({ state, handleInputChange }) => {
    /* 
    ORIGIN
    PORT OF DISCHARGE
    PORT OF LANDING
    REASON FOR EXPORT
    INSURANCE (Boolean)
    STATEMENT OF ASSURANCE (I certify above to be true and best of my knowledge)
    */
    return (
        <>
            <p>Additional Details</p>
            <div>
                <TextInput
                    value={state.origin}
                    onChange={ handleInputChange('origin') }
                    placeholder="Origin" />
                <TextInput
                    value={state.pod}
                    onChange={ handleInputChange('pod') }
                    placeholder="Port of discharge" />
                <TextInput
                    value={state.pol}
                    onChange={ handleInputChange('pol') }
                    placeholder="Port of landing" />
                <TextInput
                    value={state.reason}
                    onChange={ handleInputChange('reason') }
                    placeholder="Reason for export" />
                <div>
                    <p>Insurance : {state.insured ? 'Yes' : 'No'}</p>
                </div>
                <div>
                    <p>I certify above to be true and best of my knowledge</p>
                </div>
            </div>
        </>
    )
}