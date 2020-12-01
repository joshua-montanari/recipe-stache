import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context/UserContext'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Input from '../../Components/Controls/Input'
import { useForm, Form } from '../../Components/useForm'
import AlertMessage from '../../Components/AlertMessage/AlertMessage'
import setCookie from '../../Util/SetCookie'
import Axios from 'axios'

//*initial state
const initialValues= {
    email: '',
    password: ''
}

const Login = () => {

    const [backendError, setBackendError] = useState({ error: false, type: ''})

    //*State manager
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialValues)

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
            try{
                const loginRes = await Axios.post('http://localhost:5000/users/login', values)  //logs in the newly register user, which also generates a jwt, in which will be stored in local stroage
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            })
            //sets jwt in cookies
            setCookie('jwt', loginRes.data.token, 365)
            setCookie('userId', loginRes.data.user.id, 365)
            //goes to the home page
            history.push('/')
            }
            catch(error){
                
                if(error.response.status === 421){
                    setBackendError({error: true, type: 'No account with this email has been found'})
                }else if(error.response.status === 422){
                    setBackendError({error: true, type: 'Password does not match'})
                }else if(error.response.status === 500){
                    setBackendError({error: true, type: 'Server Error'})
                }else{
                    setBackendError({error: true, type: 'Unknown error'})
                }
            }
        }        
    }

    return (
        <div>
            <Grid container>
                {
                    backendError.error ? (
                        <>
                            <AlertMessage severity='error' message={backendError.type} />
                        </>
                    ): (
                        <>
                        </>
                    )
                }
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
