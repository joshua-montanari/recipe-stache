import React, { useState } from 'react'

export function useForm(initialValues) {
    //*state manager
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    //*changes state based of of onChange handler
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    }
}

export function Form(props) {

    //needed for onSubmit
    const { children, ...other} = props

    return (
        <form {...other}>
            {props.children}
        </form>
    )
}

