import React from "react"

export const Input = ({type, placeholder='', compact=false, ...props}) => {    
    return (
        <div style={{ display: compact ? 'inline-block': 'block' }}>
            <input
                type={type}
                placeholder={placeholder}
                {...props}
            />
        </div>
    )
}

export const TextInput = (props) => {
    return (
        <Input type='text' {...props} />
    )
}

export const NumberInput = (props) => {    
    return (
        <Input type='number' {...props} />
    )
}

export const DateInput = (props) => {    
    return (
        <Input type='date' {...props} />
    )
}

export const EmailInput = (props) => {    
    return (
        <Input type='email' {...props} />
    )
}

export const ParaInput = (props) => {
    return (
        <textarea {...props}>
        </textarea>
    )
}