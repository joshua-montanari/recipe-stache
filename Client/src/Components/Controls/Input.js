import React from 'react'
import { TextField } from '@material-ui/core'

const Input = (props) => {

    //!Input Model
    const {name, label, value, error=null, onChange, type} = props;
    return (
        <TextField 
            variant='outlined'
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            {...(error && {error:true,helperText:error})}
        />
    )
}

export default Input
