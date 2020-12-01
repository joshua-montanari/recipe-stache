import React from 'react'
import { Alert } from '@material-ui/lab'

const ErrorMessage = (props) => {
    return (
        <Alert severity={props.severity}>{props.message}</Alert>
    )
}

export default ErrorMessage
