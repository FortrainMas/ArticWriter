import Post from '../post/post'

import styles from './mainPage.module.css'

import React, {useEffect} from 'react'

export class MainPage extends React.Component{
    
    constructor(props){
        super(props)
        this.state = { articles: [] }
    }

    componentDidMount(){
        fetch('http://localhost:2000/articles', {'method':'POST', body:{skip:0, limit:10}})
            .then(res => res.json())
            .then(
                result=>{
                    this.setState({articles: result.articles})
                },
                error => {
                    console.log(error)
                }
            )
    }

    render(){
        return(
            <div className = {styles.container}>
            <h1>Recent posts</h1>
            <div className = {styles.content}>
                {
                    this.state.articles.map((article, key)=>{
                        return <Post content={article} key={key}/>
                    })
                }
            </div>
        </div>
        )
    }    
}

export default MainPage