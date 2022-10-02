import React from "react"
import {
    TextInput,
    NumberInput,
    ParaInput
} from './Inputs';

const ItemDetailsForm = ({ handleInputChange, state }) => {
    return (
        <div>
            <NumberInput 
                placeholder='HSN' 
                onChange={ handleInputChange('hsn') }
                value={state.hsn}
                compact/>
            <TextInput 
                placeholder='Description' 
                onChange={ handleInputChange('description') }
                value={state.description}
                compact/>
            <NumberInput 
                placeholder='QTY' 
                onChange={ handleInputChange('qty') }
                value={state.qty}
                compact/>
            <NumberInput 
                placeholder='Rate' 
                onChange={ handleInputChange('rate') }
                value={state.rate}
                compact/>
            <NumberInput 
                placeholder='Value' 
                onChange={ handleInputChange('value') }
                value={state.value}
                compact/>
        </div>
    )
}

export const ItemListForm = ({ items, generateChangeHandler }) => {
    return (
        <>
            <p>Items</p>
            <ul>
                {
                    items.map(
                        (item, idx) => <ItemDetailsForm key={idx} state={item} handleInputChange={generateChangeHandler(idx)} /> 
                        )
                    }
            </ul>
        </>
    )
}