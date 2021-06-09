import styles from './articlePage.module.css'

import {useEffect, useState} from 'react'
import {  useParams, withRouter } from "react-router-dom"

function Article(){
    
    const params = useParams()
    console.log(params)


    const [article, setArticle] = useState({Content:''})
    const [author, setAuthor] = useState({})

    const [isArticleLoaded, setIsArticleLoaded] = useState(false)
    const [isAuthorInfoLoaded, setIsAuthorInfoLoaded] = useState(false)

    useEffect(()=>{
        if(!isArticleLoaded){
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
            {
                article.Content.split('\n').map((x,i)=>{
                    return <p key={i}>{x}</p>
                })
            }
            </div>
        </div>
    )
}

export default withRouter(Article)