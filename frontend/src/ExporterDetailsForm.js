import React from "react"
import {
    TextInput,
    NumberInput,
    ParaInput
} from './Inputs';

export const ExporterDetailsForm = ({ handleInputChange, state }) => {    
    
    return (
        <>
            <p>Exporter Details</p>
            <div>
                <TextInput 
                    placeholder='name' 
                    onChange={ handleInputChange('name') }
                    value={state.name}/>
                <TextInput 
                    placeholder='description' 
                    onChange={ handleInputChange('description') }
                    value={state.description}/>
                <NumberInput 
                    placeholder='GSTIN' 
                    onChange={ handleInputChange('gstin') }
                    value={state.gstin}/>
                <NumberInput 
                    placeholder='IEC' 
                    onChange={ handleInputChange('iec') }
                    value={state.iec}/>
                <NumberInput 
                    placeholder='LUT' 
                    onChange={ handleInputChange('lut') }
                    value={state.lut}/>
            </div>
        </>
    )
}