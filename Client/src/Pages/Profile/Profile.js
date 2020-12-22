import React, { useState, useEffect} from 'react'
import getCookie from '../../Util/GetCookie'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const Profile = () => {

    const [user, setUser] = useState({user: undefined})
    const [loggedIn, setLoggedIn] = useState(false)

    const history = useHistory()

    const login = () => history.push('/login')

    useEffect(() => {
        
        const checkLogin = async () => {
            //? TODO: Could Maybe Use Context Here
            let token = getCookie('jwt') //sees if there is an active jwt in cookies, returns undf or null if no jwt
            const tokenRes = await Axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {'x-auth-token': token}}) //runs the tokenIsValid backend route, to check if the token from cookies is valid
            if (tokenRes.data){
              const userRes = await Axios.get('http://localhost:5000/users/', {headers: {'x-auth-token': token}, })
              setUser({ //sets the user state to the logged in user from local storage
                user: userRes.data
              })
              setLoggedIn(true)
            }else{
                setLoggedIn(false)
            }
          }
      
          checkLogin()
    }, [])



    return (
        <div>
            {loggedIn ? (
                <h1>Welcome {user.user.username} your user id is {user.user.id}</h1>
            ):(
                <>
                    <h1>Err! Something went wrong!</h1>
                    <Button variant='contained' color='primary' onClick={login}>Click Here to login!</Button>
                </>
            )}
        </div>
    )
}

export default Profile
