import { Link, Redirect, useHistory } from 'react-router-dom'
import styles from './signIn.module.css'


import {useState} from 'react'

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function SignIn(){

    const history = useHistory()

    const [isInvalidData, setIsInvalidData] = useState(false)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {


        console.log('sadf')
        setIsInvalidData(false)

        const fetchProperties = {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({login, password})
        }

        fetch(`http://localhost:2000/users/confirm`, fetchProperties)
            .then(res=>res.json())
            .then(
                result=>{
                    console.log(result)
                    if(result == false){
                        setIsInvalidData(true)
                    }else{
                        cookies.set('login', login, {path: '/'})
                        cookies.set('password', password, {path: '/'})
                        history.push('/account')
                    }
                },
                error=>{console.log('error')}
            )
    }


    return(
        <div className={styles.container}>
            <h1>Sign In</h1>
            <div className={styles.form}>
                <input className={isInvalidData?styles.invalid:''} 
                    placeholder="login" type="text" value={login} onInput={ev=>{setLogin(ev.target.value)}}/>
                <input className={isInvalidData?styles.invalid:''} 
                    placeholder="password" type="password" value={password} onInput={ev=>{setPassword(ev.target.value)}}/>
                <input type="submit" value="Sign In" onClick={handleSubmit}/>
            </div>
            <Link to="/signup">
                <h4>Haven't got account yet</h4>
            </Link>
        </div>
    )
}