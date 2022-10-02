import React from "react"
import {
    TextInput,
    NumberInput,
    ParaInput
} from './Inputs';

export const AccountDetailsForm = ({ state, handleInputChange }) => {
    return (
        <>
            <p>Account Details</p>
            <div>
                <TextInput 
                    placeholder='Bank Name' 
                    onChange={ handleInputChange('bankName') }
                    value={state.bankName}/>
                <TextInput 
                    placeholder='Branch' 
                    onChange={ handleInputChange('branch') }
                    value={state.branch}/>
                <TextInput 
                    placeholder='Account Name' 
                    onChange={ handleInputChange('accountName') }
                    value={state.accountName}/>
                <NumberInput 
                    placeholder='Account Number' 
                    value={state.accountNumber}
                    onChange={ handleInputChange('accountNumber') }/>
                <NumberInput 
                    placeholder='IFSC' 
                    onChange={ handleInputChange('ifsc') }
                    value={state.ifsc}/>
            </div>
        </>
    )
}