import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Profile from './Pages/Profile/Profile'
import Navbar from './Components/Navbar/Navbar'
import AppBar from './Components/Navbar/AppBar'
import Error from './Pages/Error/Error'
import getCookie from './Util/GetCookie'
import Axios from 'axios'
import UserContext from './Context/UserContext'

function App() {

  //sets current jwt and active user data in state, and then passes it to the whole applicaiton
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  //checks if a user is already logged in from last session (checks if there  is a jwt in local storage, and if jwt i valid)
  useEffect( () => {
    const checkLogin = async () => {
      let token = getCookie('jwt') //sees if there is an active jwt in cookies, returns undf or null if no jwt
      const tokenRes = await Axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {'x-auth-token': token}}) //runs the tokenIsValid backend route, to check if the token from cookies is valid
      if (tokenRes.data){
        const userRes = await Axios.get('http://localhost:5000/users/', {headers: {'x-auth-token': token}, })
        setUserData({ //sets the user state to the logged in user from local storage
          token,
          user: userRes.data
        })
      }
    }

    checkLogin()

  }, [])

  return (
    <>
      <UserContext.Provider value={ {userData, setUserData} }>
        <AppBar />
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profile' component={Profile} />
          <Route component={Error} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;
