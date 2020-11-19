import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context/UserContext'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const {setUserData} = useContext(UserContext)

    const history = useHistory()

    const register = () => history.push('/register')

    const submit = async (e) => {
        e.preventDefault() // prevents page reload, so state isnt lost
        const loginUser = {email, password}
        const loginRes = await Axios.post('http://localhost:5000/users/login', loginUser)  //logs in the newly register user, which also generates a jwt, in which will be stored in local stroage
        
        //sets context for whole app
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        //sets jwt in localstroage
        localStorage.setItem('auth-token', loginRes.data.token)
        localStorage.setItem('user-id', loginRes.data.user.id)
        localStorage.setItem('username', loginRes.data.user.username)
        //goes to the home page
        history.push('/')
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <h2>Login</h2>
                    <form onSubmit={submit}>
                        <InputLabel htmlFor='login-email'>Email: </InputLabel>
                        <TextField id='login-email' type='email' onChange={(e) => setEmail(e.target.value)}/>

                        <InputLabel htmlFor='login-password'>Password: </InputLabel>
                        <TextField id='login-password' type='password' onChange={(e) => setPassword(e.target.value)} />
                        
                        <Button variant='contained' color='primary' type='submit' value='Login'>Login</Button>
                    </form>
                    <Button variant='contained' color='primary' onClick={register}>Need to make and account?</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login
