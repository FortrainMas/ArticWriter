import styles from './account.module.css'

import {useState} from 'react'

import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Account(){


    const [userData, setUserData] = useState({})

    //Page autoredirects to /sigin form in case user wasn't loaded. 
    //So in case, if it isn't password or login in cookies or in case it has some error
    const [isRedirect, setIsRedirect] = useState(false)

    const login = cookies.get('login')
    const password = cookies.get('password')


    console.log(`Login: ${login}; pass: ${password}`)


    const queryBody = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
    }

    fetch(`http://localhost:2000/users/check`, queryBody)
        .then(res => res.json())
        .then(
            result=>{
                if(result == false){
                  setIsRedirect(true)
                }else{
                  setIsRedirect(false)
                  setUserData(result)
                }
            },
            error => {
                console.log(error)
            }
        )

    if(isRedirect){
        return(
            <h3>Schade</h3>
        )
    }else{
        return(
            <h1>Logged in</h1>
        )
    }
    
}