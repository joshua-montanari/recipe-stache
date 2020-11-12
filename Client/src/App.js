import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Navbar from './Components/Navbar/Navbar'
import Error from './Pages/Error/Error'
import Hero from './Components/Hero'

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
