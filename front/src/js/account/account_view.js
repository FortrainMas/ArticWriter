import React from 'react';
import styles from './account_view.module.css'

import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default class Account_view extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: this.props.user,
            userName: this.props.user.name,
            userSurname: this.props.user.surname,
            photo: this.props.user.photo,
            articles: this.props.user.articles,
            isRedirect: false
        }  

        this.cookies = new Cookies();
        this.imgInput = React.createRef();
    }

    //Update user's name localy
    setUserName = ({target}) => {
        this.setState({userName: target.value})
    }

    //Update user's surname localy
    setUserSurname = ({target}) => {
        this.setState({userSurname: target.value})
    }
    
    loadImage = ({target})=>{
        const image = target.files[0]
        

        let formData = new FormData();
        formData.append('img', image);

        const queryBody = {
            method: 'POST',
            headers: {enctype: "multipart/form-data"},
            body: formData
        }

        fetch(`http://localhost:2000/img/load`, queryBody)
            .then(res=>res.json())
            .then(result=>{
                this.setState({photo: result.filename})
                console.log(result)})
            .catch(error=>{console.log(error)})
        
    }

    openImageExplorer = () => {
        this.imgInput.current.click()
    }

    updateUserData = () => {
        
        const queryBody = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                login: this.props.user.login,
                password: this.props.user.password,
                updatedUser:{
                    name: this.state.userName,
                    surname: this.state.userSurname,
                    photo: this.state.photo
                }
            })
        }

        fetch(`http://localhost:2000/users/update`, queryBody)
    }

    logOut = () => {
        this.cookies.remove('login')
        this.cookies.remove('password')
        this.setState({isRedirect: true})
    }

    render(){
        if(this.state.isRedirect) { return <Redirect to={'/create-article'} /> } 
        return(
            <div className={styles.container}>
                <input name="avatar" type="file"  onChange={this.loadImage} accept="image/*" ref={this.imgInput}/>
                
                <div className={styles.userData}>
                    <img src={`http://localhost:2000/img?img=${this.state.photo}`}
                         className={styles.userPhoto} 
                         onClick={this.openImageExplorer}
                        />
                    <div className = {styles.userProfileDataBlock}>
                        <div className = {styles.profileData}>
                            <label>Name</label>
                            <input type="text" value={this.state.userName} onInput={this.setUserName} />
                        </div>
                        <div className = {styles.profileData}>
                            <label>Surname</label>
                            <input type="text" value={this.state.userSurname} onInput={this.setUserSurname} />
                        </div>
                    </div>
                </div>


                <div className={styles.buttonsBlock}>

                    <button className={styles.button} onClick={this.updateUserData}>
                        <h2>Save</h2>
                    </button>

                    <Link className={styles.link}>
                        <button className={styles.button}>
                            <h2>Create Article</h2>
                        </button>
                    </Link>
            
            
                    <Link to="/create-article" className={styles.link} onClick={this.logOut}>
                        <button className={styles.button} >
                            <h2>Log Out</h2>
                        </button>
                    </Link>
                </div>

            </div>
        )
    }
}