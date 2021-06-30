
import React, {useState, useEffect} from 'react'

import {Link} from 'react-router-dom'


//I don't know the better way.
//There are two files with styles. And i have one property that determine which style bunch has to be to used
//So thees styles set to styles variable
import styleBunch1 from './post.module.css'
import styleBunch2 from './post_sideArticle_style.module.css'
let styles = {}



export default class Post extends React.Component{
    constructor(props){
        super(props)
        
        if(props.isSideArticle){
            styles = styleBunch2
        }else{
            styles = styleBunch1
        }

        //In case there is occures some error or internet is dead there is a default user data. Just pic and no name
        this.state = {author: {name: '', surname: '', photo: 'user.png'}}
    }

    componentDidMount(){
        fetch(`http://localhost:2000/users/${this.props.content.authorId}`)
            .then(res=>{
                return res.json()})
            .then(
                result=>{
                    console.log(result)
                    this.setState({author: result.user})
                },
                error => {
                    console.log(error)
                }
            )
    }

    render(){
        if(this.props.content.photo){
            return(
                <a href={`/article/${this.props.content._id}`} style={{ textDecoration: 'none' }}>
                    <div className={styles.container}>
                        <div>
                            <img src={`http://localhost:2000/img?img=${this.props.content.photo}`} className={styles.img}/>
                        </div>
                        <div className={styles.info}>
                            <h4>{this.props.content.title}</h4>
                            <div className={styles.author}>
                                <img src={`http://localhost:2000/img?img=${this.state.author.photo}`} className={styles.authorImg} />
                                <h6>{`${this.state.author.name} ${this.state.author.surname}`}</h6>
                            </div>
                        </div>
                    </div>
                </a>
            )
        }else{
            return(
                <a href={`/article/${this.props.content._id}`} style={{ textDecoration: 'none' }}>
                    <div className={styles.container}>
                        <div className={styles.info}>
                            <h4>{this.props.content.title}</h4>
                            <div className={styles.author}>
                                <img src={`http://localhost:2000/img?img=${this.state.author.photo}`} className={styles.authorImg} />
                                <h6>{`${this.state.author.name} ${this.state.author.surname}`}</h6>
                            </div>
                        </div>
                    </div>
                </a>
            )
        }
    }

}