import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context/UserContext'
import InputLabel from '@material-ui/core/InputLabel'
import  { Grid, TextField, makeStyles}  from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Input from '../../Components/Controls/Input'
import Axios from 'axios'
import { useForm, Form } from '../../Components/useForm'
import AlertMessage from '../../Components/AlertMessage/AlertMessage'

//*initial state
const initialValues = {
    email: '',
    password: '',
    passwordCheck: '',
    username: ''
}



const Register = () => {

    //*State manager
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialValues)

    //*true if user tries to register with an existing email
    const [backendError, setBackendError] = useState({ error: false, type: ''})

    const history = useHistory()

    const login = () => history.push('/login')

    //*Checks each form field and makes sure its correct
    const validate = () => {
        let temp = {}
        temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "Email is not valid"
        temp.password = values.password ? "" : "This field is required"
        temp.passwordCheck = values.passwordCheck === values.password ? "" : "Passwords must match"
        temp.username = values.username ? "" : "This field is required"
        setErrors({
            ...temp
        })

        //*if all values are an empty string, then it is valid
        return Object.values(temp).every(x => x === "")
    }

    const submit = async (e) => {
        e.preventDefault()
        if(validate()){
            //!registers user, sends to login
            try{
                await Axios.post('http://localhost:5000/users/register', values)
                history.push('/login')
            }
            catch(error){
                if(error.response.status === 420){
                    setBackendError({error: true, type: 'This email is already registered'})
                }else if(error.response.status === 423){
                    setBackendError({error: true, type: 'Username already taken'})
                }else if(error.response.status === 500){
                    setBackendError({error: true, type: 'Server Error'})
                }else{
                    setBackendError({error: true, type: 'Unknown error'})
                }
            }
        }    
    }

    return (
            
            <Grid container>
                {
                    backendError.error ? (
                        <>
                            <AlertMessage severity='error' message={backendError.type}/>
                        </>
                    ): (
                        <>
                            
                        </>
                    )
                }
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Form onSubmit={submit}>
                            <Input 
                                label='Email'
                                name='email'
                                value={values.email}
                                type='text'
                                onChange={handleInputChange}
                                error={errors.email}
                            />
                            <Input
                                label='Password'
                                name='password'
                                type='password'
                                value={values.password}
                                onChange={handleInputChange}
                                error={errors.password}
                            />
                            <Input 
                                label='Verify Password'
                                name='passwordCheck'
                                type='password'
                                value={values.passwordCheck}
                                onChange={handleInputChange}
                                error={errors.passwordCheck}
                            />
                            <Input
                                label='Username'
                                name='username'
                                type='text'
                                value={values.username}
                                onChange={handleInputChange}
                                error={errors.username}
                            />
                            <Button variant='contained' color='primary' type='submit'>Register</Button>
                        </Form>
                    </Grid> 
                <Button variant='contained' color='primary' onClick={login}>Already have an account?</Button>
                <Grid item xs={3}></Grid>
            </Grid>
    )
}

export default Register
