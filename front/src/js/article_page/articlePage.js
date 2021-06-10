import styles from './articlePage.module.css'
import Post from '../post/post'

import {useEffect, useState} from 'react'
import {  useParams, withRouter } from "react-router-dom"

function Article(){
    
    const params = useParams()
    console.log(params)


    const [article, setArticle] = useState({Content:''})
    const [author, setAuthor] = useState({})
    const [sideArticles, setSideArticles] = useState([])

    const [isArticleLoaded, setIsArticleLoaded] = useState(false)
    const [isAuthorInfoLoaded, setIsAuthorInfoLoaded] = useState(false)
    const [areSideArticlesLoaded, setAreSideArticlesLoaded] = useState(false)


    //Loads article by ID. If article was successfully loaded, loads the article's author.
    //After that loads side articles
    useEffect(()=>{
        if(!isArticleLoaded){
            //Load the main article of the page
            fetch(`http://localhost:2000/articles/${params.article}`)
                .then(res=>{
                    return res.json()})
                .then(
                    result=>{
                        setArticle(result)
                        setIsArticleLoaded(true)
                    },
                    error => {
                        setIsArticleLoaded(true)
                        console.log(error)
                    }
                )
        }else{
            //When the article is loaded, loads author info
            if(!isAuthorInfoLoaded){
                fetch(`http://localhost:2000/users/${article.AuthorId}`)
                .then(res=>{
                    return res.json()})
                .then(
                    result=>{
                        setAuthor(result)
                        setIsAuthorInfoLoaded(true)
                    },
                    error => {
                        console.log(error)
                        setIsAuthorInfoLoaded(true)
                    }
                )
            }

            //Load side articles
            if(!areSideArticlesLoaded){
                fetch(`http://localhost:2000/articles`)
                .then(res=>{
                    return res.json()})
                .then(
                    result=>{
                        console.log(result)
                        setSideArticles(result)
                        setAreSideArticlesLoaded(true)
                    },
                    error => {
                        console.log(error)
                        setAreSideArticlesLoaded(true)
                    }
                )
            }
        }
        
    })

    return(
        <div className={styles.container}>
            
            <div className={styles.info}>
                <h2>{article.Title}</h2>
                <div className = {styles.author}>
                    <img src={`http://localhost:2000/img?img=${author.photo}`}/>
                    <h3>{`${author.name} ${author.surname}`}</h3>
                </div>
            </div>

            <div className={styles.content}>
                <div className = {styles.text}>
                    {
                        article.Content.split('\n').map((x,i)=>{
                            return <p key={i}>{x}</p>
                        })
                    }
                </div>
                <div className={styles.sideArticles}>
                    {
                        sideArticles.map((x,i)=>{
                            console.log(x)
                            return <Post content={x} key={i} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Article)