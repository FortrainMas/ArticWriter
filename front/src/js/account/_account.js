import styles from './_account.module.css'

import React, {useState, useEffect, useRef} from 'react'

import { BoxLoading } from 'react-loadingg';
import AccountMessage from './account_message';

import {useHistory, withRouter, Link} from 'react-router-dom'
import Cookies from 'universal-cookie';

import Account_view from './account_view';


class Account extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isOnLoading: true,
            isNotSignIn: false,
            isErrorOccured: false,
            user: null
        }
    }

    componentDidMount(){

        const cookies = new Cookies();

        const login = cookies.get('login')
        const password = cookies.get('password')


        console.log(login)
        console.log(password)
        if(!login || !password){
            this.setState({isNotSignIn: true})
            this.setState({isOnLoading: false})
            return
        }

        const requestBody = {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({login, password})
        }

        fetch('http://localhost:2000/users/confirm', requestBody)
            .then(res=> res.json() )
            .then(res=>{
                if(res.status == 'success'){
                    res.response.password = password
                    this.setState({user: res.response})
                }else{
                    this.setState({isErrorOccured: true})
                }
                this.setState({isOnLoading: false})
            })
    }

    render(){
        if(this.state.isOnLoading){
            return <BoxLoading />
        }

        if(this.state.isErrorOccured){
            return <AccountMessage messageType = {'error'}/>
        }

        if(this.state.isNotSignIn){
            return <AccountMessage messageType = {'notRegistred' } />
        }
            
        return <Account_view user={this.state.user}/>
    }

}

export default withRouter(Account)

// export default function Account(){

//     //To make redirection
//     const history = useHistory()

//     //Data of loaded user. Is used to check if user was loaded and to show user data
//     const [userData, setUserData] = useState({})

//     //File input is not displayed, but have to be called when user press his photo
//     const fileInputField = useRef(null)

//     //Is being called by click on the user's photo. Just calls input[type="file"] click method
//     const openImageExplorer = () =>{
//         fileInputField.current.click()
//     }

//     //Loads user, if it isn't already loaded
//     //In case it occures some errors or problems, redirects to singin page
//     //User is have to be loaded by password and login in cookies
//     useEffect(()=>{
//         if(userData.name==undefined){
//             const login = cookies.get('login')
//             const password = cookies.get('password')
            
//             const queryBody = {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({login, password})
//             }
        
//             fetch(`http://localhost:2000/users/check`, queryBody)
//                 .then(res => res.json())
//                 .then(
//                     result=>{
//                         if(result == false){
//                             history.push('/signin')
//                         }else{
//                           setUserData(result)
//                         }
//                     },
//                     error => {
//                         console.log(error)
//                     }
//                 )            
//         }
//     })

    
//     //Update user's name localy
//     const setUserName = ({target}) => {
//         setUserData({...userData, name:target.value})
//     }

//     //Update user's surname localy
//     const setUserSurname = ({target}) => {
//         setUserData({...userData, surname:target.value})
//     }
    
//     //Update user's name on the server
//     //Should be called only in two cases: 
//         //onBlur name input with object {name: userData.name}
//         //onBlur surname input with object {surname: userData.surname}
//     const updateUserData = (updatedUser)=>{
//         const login = cookies.get('login')
//         const password = cookies.get('password')
        
//         const queryBody = {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({login, password, updatedUser})
//         }
//         console.log('requested')
//         fetch(`http://localhost:2000/users/update`, queryBody)
//    }


//     //Show that data is being loaded
//     if(userData.name == undefined){
//         return (
//             <BoxLoading color="#a8dadc"/>
//         )
//     }

//     const loadImage = ({target})=>{
//         const image = target.files[0]
        

//         let formData = new FormData();
//         formData.append('img', image);

//         const queryBody = {
//             method: 'POST',
//             headers: {enctype: "multipart/form-data"},
//             body: formData
//         }

//         console.log('Called')
//         fetch(`http://localhost:2000/img/load`, queryBody)
//             .then(res=>res.json())
//             .then(result=>{
//                 updateUserData({photo: result.filename})
//                 setUserData({})
//                 console.log(result)})
//             .catch(error=>{console.log(error)})
        
//     }

//     const logOut = () => {
//         cookies.set('login', null)
//         cookies.set('password', null)
//         history.push('/signin')
//     }
    
//     return(
//         <div className={styles.container}>
//             <input name="avatar" type="file" ref={fileInputField} onChange={loadImage} accept="image/*"/>
//             <div className={styles.userData}>
//                 <img src={`http://localhost:2000/img?img=${userData.photo}`} className={styles.userPhoto} onClick={openImageExplorer}/>
                
//                 <div className = {styles.userProfileDataBlock}>
//                     <div className = {styles.profileData}>
//                         <label>Name</label>
//                         <input type="text" value={userData.name} onInput={setUserName} onBlur={()=>{updateUserData({name: userData.name})}}/>
//                     </div>
//                     <div className = {styles.profileData}>
//                         <label>Surname</label>
//                         <input type="text" value={userData.surname} onInput={setUserSurname} onBlur={()=>{updateUserData({surname: userData.surname})}}/>
//                     </div>
//                 </div>
//             </div>
//             <Link to="/create-article">
//                 <button className={styles.createArticle}>
//                     <h3>Create Article</h3>
//                 </button>
//             </Link>

//             <button className={styles.logOut} onClick={logOut}>
//                 <h2>Log Out</h2>
//             </button>
//         </div>
//     )
    
// }