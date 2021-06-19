import styles from './account.module.css'

import {useState, useEffect, useRef} from 'react'

import { BoxLoading } from 'react-loadingg';

import {useHistory, Link} from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Account(){

    //To make redirection
    const history = useHistory()

    //Data of loaded user. Is used to check if user was loaded and to show user data
    const [userData, setUserData] = useState({})

    //File input is not displayed, but have to be called when user press his photo
    const fileInputField = useRef(null)

    //Is being called by click on the user's photo. Just calls input[type="file"] click method
    const openImageExplorer = () =>{
        fileInputField.current.click()
    }

    //Loads user, if it isn't already loaded
    //In case it occures some errors or problems, redirects to singin page
    //User is have to be loaded by password and login in cookies
    useEffect(()=>{
        if(userData.name==undefined){
            const login = cookies.get('login')
            const password = cookies.get('password')
            
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
                            history.push('/signin')
                        }else{
                          setUserData(result)
                        }
                    },
                    error => {
                        console.log(error)
                    }
                )            
        }
    })

    
    //Update user's name localy
    const setUserName = ({target}) => {
        setUserData({...userData, name:target.value})
    }

    //Update user's surname localy
    const setUserSurname = ({target}) => {
        setUserData({...userData, surname:target.value})
    }
    
    //Update user's name on the server
    //Should be called only in two cases: 
        //onBlur name input with object {name: userData.name}
        //onBlur surname input with object {surname: userData.surname}
    const updateUserData = (updatedUser)=>{
        const login = cookies.get('login')
        const password = cookies.get('password')
        
        const queryBody = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login, password, updatedUser})
        }
        console.log('requested')
        fetch(`http://localhost:2000/users/update`, queryBody)
   }


    //Show that data is being loaded
    if(userData.name == undefined){
        return (
            <BoxLoading color="#a8dadc"/>
        )
    }

    const loadImage = ({target})=>{
        const image = target.files[0]
        

        let formData = new FormData();
        formData.append('img', image);

        const queryBody = {
            method: 'POST',
            headers: {enctype: "multipart/form-data"},
            body: formData
        }

        console.log('Called')
        fetch(`http://localhost:2000/img/load`, queryBody)
            .then(res=>res.json())
            .then(result=>{
                updateUserData({photo: result.filename})
                setUserData({})
                console.log(result)})
            .catch(error=>{console.log(error)})
        
    }
    
    return(
        <div className={styles.container}>
            <input name="avatar" type="file" ref={fileInputField} onChange={loadImage} accept="image/*"/>
            <div className={styles.userData}>
                <img src={`http://localhost:2000/img?img=${userData.photo}`} className={styles.userPhoto} onClick={openImageExplorer}/>
                
                <div className = {styles.userProfileDataBlock}>
                    <div className = {styles.profileData}>
                        <label>Name</label>
                        <input type="text" value={userData.name} onInput={setUserName} onBlur={()=>{updateUserData({name: userData.name})}}/>
                    </div>
                    <div className = {styles.profileData}>
                        <label>Surname</label>
                        <input type="text" value={userData.surname} onInput={setUserSurname} onBlur={()=>{updateUserData({surname: userData.surname})}}/>
                    </div>
                </div>
            </div>
            <Link to="/create-article">
                <button className={styles.createArticle}>
                    <h3>Create Article</h3>
                </button>
            </Link>
        </div>
    )
    
}