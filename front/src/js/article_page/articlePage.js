import styles from './articlePage.module.css'
import Post from '../post/post'

import { BoxLoading } from 'react-loadingg';
import React, {useEffect, useState} from 'react'
import {  useParams, withRouter } from "react-router-dom"

import ArticleNotFound from './article_not_found';

class Article extends React.Component{
    constructor(props){
        super(props)
        this.params = this.props.match.params
        this.state = {
            isTriedToLoad: false,
            article: undefined, 
            author: { name: '', surname: '', photo: 'user.png' }, 
            sideArticles: []
        }
    }

    componentDidMount(){
        this.loadMainArticle()
        this.loadSideArticles()
    }

    loadMainArticle = () => {
        fetch(`http://localhost:2000/articles/${this.params.article}`)
            .then(res=>{
                return res.json()})
            .then(
                result=>{
                    console.log('Bruh')
                    this.setState({ article: result.article})
                    this.loadAuthor(this.state.article.authorId)
                },
                error => {
                    this.setState({isTriedToLoad: true})
                    console.log(error)
                })
    }

    loadAuthor = (id) => {
        fetch(`http://localhost:2000/users/${id}`)
            .then(res=>{
                return res.json()})
            .then(
                result=>{
                    if(result.user != undefined){
                        this.setState({author: result.user, isTriedToLoad: true})
                    }
                },
                error => {
                    console.log(error)
                }
            )
    }

    loadSideArticles = () => {

        const queryBody = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                limit: 5,
                skip: 0
            })
        }


        fetch('http://localhost:2000/articles', queryBody)
            .then(res => res.json())
            .then(
                result=>{
                    this.setState({sideArticles: result.articles})
                },
                error => {
                    console.log(error)
                }
            )
    }


    render(){
        
        if(!this.state.isTriedToLoad){
            return <BoxLoading/>
        }else if(!this.state.isTriedToLoad && this.state.article == undefined){
            return <ArticleNotFound />
        }else{
            console.log(this.state.article.content.split('\n'))
            return(
                <div className={styles.container}>
                    
                    {/* Content block */}
                    <div className = {styles.content}>
                        
                        {/* Info block */}
                        <div className={styles.info}>
                            <h2>{this.state.article.title}</h2>
                            <div className={styles.nonTitle}>
                                <div className={styles.author}>
                                    <img src={`http://localhost:2000/img?img=${this.state.author.photo}`} />
                                    <h3>{`${this.state.author.name} ${this.state.author.surname}`}</h3>
                                </div>
                                <div className={styles.rate}>
                                    <h3>RATE</h3>
                                </div>
                            </div>
                        </div>
                        
                        {/* Text block */}
                        <div className={styles.text}>
                            {
                                this.state.article.content.split('\n').map((paragraph, i) => {
                                    return <p key={i}>{paragraph}</p>
                                })
                            }
                        </div>
                    </div>

                    {/* Side articles block */}
                    <div className={styles.sideArticles}>
                        {
                            this.state.sideArticles.map((article, key) => {
                                return <Post content={article} key={key} isSideArticle = {true}/>
                            })
                        }
                    </div>

                </div>
            )
        }
    }
}

export default withRouter(Article)
