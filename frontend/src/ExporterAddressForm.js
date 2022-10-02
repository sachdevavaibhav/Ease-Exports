import React from "react"
import {
        TextInput,
        NumberInput,
        ParaInput
} from './Inputs';

export const ExporterAddressForm = ({ handleInputChange, state }) => {
    return (
        <>
            <p>Exporter Address</p>
            <div>
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