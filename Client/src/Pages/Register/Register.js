import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context/UserContext'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Axios from 'axios'

const Register = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [username, setUsername] = useState()

    const {setUserData} = useContext(UserContext)

    const history = useHistory()

    const login = () => history.push('/login')

    const submit = async (e) => {
        e.preventDefault() // prevents page reload, so state isnt lost
        const newUser = {email, password, passwordCheck, username}
        await Axios.post('http://localhost:5000/users/register', newUser) //puts newUser object into the database using the register route

        const loginRes = await Axios.post('http://localhost:5000/users/login', {email, password})  //logs in the newly registed user, which also generates a jwt, in which will be stored in local stroage
        
        //sets context for whole app
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        //sets jwt in localstorage
        localStorage.setItem('auth-token', loginRes.data.token)
        //goes to the home page
        history.push('/')
    }

    return (
        <div>
            <Grid container spacing={3}>
            <Grid item md={12}>
                <h2>Register</h2>
                <form onSubmit={submit}>
                    <InputLabel htmlFor='register-email'>Email: </InputLabel>
                    <TextField id='register-email' placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)}/>

                    <InputLabel htmlFor='register-password'>Password: </InputLabel>
                    <TextField id='register-password' placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                    <TextField type='password' placeholder='Verify Password' onChange={(e) => setPasswordCheck(e.target.value)}/>

                    <InputLabel htmlFor='register-username'>Username: </InputLabel>
                    <TextField id='register-username' placeholder='Username' type='text' onChange={(e) => setUsername(e.target.value)}/>

                    <Button variant='contained' color='primary' type='submit'>Register</Button>
                </form>
                <Button variant='contained' color='primary' onClick={login}>Already have an account?</Button>
            </Grid>
            </Grid>
        </div>
    )
}

export default Register
