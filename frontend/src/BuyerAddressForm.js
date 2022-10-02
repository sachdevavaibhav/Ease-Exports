import React from "react"
import {
        TextInput,
        NumberInput,
        ParaInput
    } from './Inputs';
    
export const BuyerAddressForm = ({ handleInputChange, state }) => {
    return (
        <>
            <p>Buyer Address</p>
            <div>
                <TextInput 
                        placeholder='name' 
                        onChange={ handleInputChange('name') }
                        value={state.name}/>
                <TextInput 
                        placeholder='address line 1' 
                        onChange={ handleInputChange('addressLine1') }
                        value={state.addressLine1}/>
                <TextInput 
                        placeholder='address line 2' 
                        onChange={ handleInputChange('addressLine2') }
                        value={state.addressLine2}/>
                <TextInput 
                        placeholder='city' 
                        onChange={ handleInputChange('city') }
                        value={state.city}/>
                <TextInput 
                        placeholder='state' 
                        onChange={ handleInputChange('state') }
                        value={state.state}/>
                <NumberInput 
                    placeholder='pincode' 
                    value={state.pincode}
                    onChange={ handleInputChange('pincode') }/>
            </div>
        </>
    )
}