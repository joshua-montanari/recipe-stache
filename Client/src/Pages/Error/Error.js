import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const Error = () => {

    const history = useHistory()
    const home = () => history.push('/')

    return (
        <>
                <div>
                   <h1>Uh Oh! This page is not Found!</h1>
                   <Button variant='contained' color='primary' onClick={home}>Go Home!</Button>
                </div>
                
        </>
    )
}

export default Error
