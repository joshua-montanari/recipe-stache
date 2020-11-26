import React from 'react'
import { TextField } from '@material-ui/core'

const Input = (props) => {

    const {name, label, value, onChange,type } = props;
    return (
        <TextField 
            variant='outlined'
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
        />
    )
}

export default Input
