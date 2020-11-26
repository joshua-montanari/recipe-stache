import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context/UserContext'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Input from '../../Components/Controls/Input'
import { useForm, Form } from '../../Components/useForm'
import Axios from 'axios'

//*initial state
const initialValues= {
    email: '',
    password: ''
}

const Login = () => {

    //*State manager
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialValues)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const {setUserData} = useContext(UserContext)

    const history = useHistory()

    const register = () => history.push('/register')

    const validate = () => {
        let temp = {}
        temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "Email is not valid"
        temp.password = values.password ? "" : "This field is required"
        setErrors({
            ...temp
        })

        //*if all values are an empty string, then it is valid
        return Object.values(temp).every(x => x === "")
    }

    const submit = async (e) => {
        e.preventDefault() // prevents page reload, so state isnt lost
        if(validate()){
            const loginRes = await Axios.post('http://localhost:5000/users/login', values)  //logs in the newly register user, which also generates a jwt, in which will be stored in local stroage
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
    }

    return (
        <div>
            <Grid container>
                <Grid item md={3}></Grid>
                <Grid item md={6}>
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
                            value={values.password}
                            type='password'
                            onChange={handleInputChange}
                            error={errors.password}
                        />
                        <Button variant='contained' color='primary' type='submit' value='Login'>Login</Button>
                    </Form>
                    <Button variant='contained' color='primary' onClick={register}>Need to make and account?</Button>
                </Grid>
                <Grid item md={3}></Grid>
            </Grid>
        </div>
    )
}

export default Login
