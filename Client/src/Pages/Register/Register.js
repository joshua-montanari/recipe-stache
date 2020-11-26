import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context/UserContext'
import InputLabel from '@material-ui/core/InputLabel'
import  { Grid, TextField, makeStyles}  from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Input from '../../Components/Controls/Input'
import Axios from 'axios'
import { useForm, Form } from '../../Components/useForm'

const initialValues = {
    email: '',
    password: '',
    passwordCheck: '',
    username: ''
}

const Register = () => {

    const{
        values,
        setValues,
        handleInputChange
    } = useForm(initialValues)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [username, setUsername] = useState()

    const {setUserData} = useContext(UserContext)

    const history = useHistory()

    const login = () => history.push('/login')

    const submit = async (e) => {
        console.log('submit btn works')
        e.preventDefault() // prevents page reload, so state isnt lost
        // const newUser = {values}
        await Axios.post('http://localhost:5000/users/register', values) //puts newUser object into the database using the register route

        // const loginRes = await Axios.post('http://localhost:5000/users/login', {email, password})  //logs in the newly registed user, which also generates a jwt, in which will be stored in local stroage
        
        //sets context for whole app
        // setUserData({
        //     token: loginRes.data.token,
        //     user: loginRes.data.user
        // })
        // //sets jwt in localstorage
        // localStorage.setItem('auth-token', loginRes.data.token)
        //goes to the home page
        history.push('/login')
    }

    return (
            <Grid container>
                <Grid item xs={3}></Grid>
                <Form onSubmit={submit}>
                    <Grid item xs={6}>
                        <Input 
                            label='Email'
                            name='email'
                            value={values.email}
                            type='email'
                            onChange={handleInputChange}
                        />
                        <Input
                            label='Password'
                            name='password'
                            type='password'
                            value={values.password}
                            onChange={handleInputChange}
                        />
                        <Input 
                            label='Verify Password'
                            name='passwordCheck'
                            type='password'
                            value={values.passwordCheck}
                            onChange={handleInputChange}
                        />
                        <Input
                            label='Username'
                            name='username'
                            type='text'
                            value={values.username}
                            onChange={handleInputChange}
                        />
                        <Button variant='contained' color='primary' type='submit'>Register</Button>
                    </Grid> 
                </Form>
                <Button variant='contained' color='primary' onClick={login}>Already have an account?</Button>
                <Grid item xs={3}></Grid>
            </Grid>
    )
}

export default Register
