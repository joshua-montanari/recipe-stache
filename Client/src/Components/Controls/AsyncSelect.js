import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles(() => ({
    categoryDropdown: {
        minWidth: '180px'
    }
}));

const AsyncSelect = (props) => {

    const { name, label, value, error=null, onChange, options } = props;

    const classes = useStyles();

    return (
        <FormControl variant="filled" {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <Select
                className={classes.categoryDropdown}
                fullWidth
                value={value}
                onChange={onChange}
                label={label}
                name={name}
            >
                {options.map(item => {
                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                })}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}

export default AsyncSelect;