import styles from './signup.module.css'

import {Link, useHistory} from 'react-router-dom'

import {useState} from 'react'

import Cookies from 'universal-cookie';

const cookies = new Cookies();


export default function SignUp(){

    const history = useHistory()
    
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [isInvalidData, setIsInvalidData] = useState(false)

    const handleSubmit = (event) => {

        setIsInvalidData(false)

        const fetchProperties = {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({login, password, name, surname})
        }

        fetch(`http://localhost:2000/users/create`, fetchProperties)
            .then(res=>res.json())
            .then(
                result=>{
                    console.log(result)
                    if(result.Status == 'Success'){
                        cookies.set('login', login, { path: '/account' })
                        localStorage.setItem('login', login);
                        cookies.set('password', password, { path: '/account' })
                        localStorage.setItem('password', password);
                        history.push('/account')
                    }else{
                        console.log('Nu')
                        setIsInvalidData(true)
                    }
                },
                error => { console.log('error') }
            )        

    
    }


    return(
        <div className={styles.container}>
            <h1>Sign Up</h1>
            <div className={styles.form}>
                <input 
                    className={isInvalidData?styles.invalid:''}
                    placeholder="name" type="text" value={name} onInput={ev=>{setName(ev.target.value)}}/>
                <input 
                    className={isInvalidData?styles.invalid:''}
                    placeholder="surname" type="text" value={surname} onInput={ev=>{setSurname(ev.target.value)}}/>
                <input 
                    className={isInvalidData?styles.invalid:''}
                    placeholder="login" type="text" value={login} onInput={ev=>{setLogin(ev.target.value)}}/>
                <input
                    className={isInvalidData?styles.invalid:''}
                    placeholder="password" type="password" value={password} onInput={ev=>{setPassword(ev.target.value)}}/>
                <input
                    className={isInvalidData?styles.invalid:''}
                    type="submit" value="Sign Up" onClick={handleSubmit}/>
            </div>
            <Link to="/signin">
                <h4>Have an account</h4>
            </Link>
        </div>
    )
}