import styles from './post.module.css'

import {useState, useEffect} from 'react'

export default function Post({content}){

    const [isLoaded, setIsLoaded] = useState(false)
    const [author, setAuthor] = useState({})

    //Load author by his id
    useEffect( ()=>{
        if(!isLoaded){
            console.log('q')
            fetch(`http://localhost:2000/users/${content.AuthorId}`)
                .then(res=>{
                    return res.json()})
                .then(
                    result=>{
                        setAuthor(result)
                        setIsLoaded(true)
                    },
                    error => {
                        console.log(error)
                        setIsLoaded(true)
                    }
                )
        }
    })

    return(
        <div className={styles.container}>
            {
                [''].map(()=>{
                    console.log(content)
                    if(content.Photo){
                        return <img src={`http://localhost:2000/img?img=${content.Photo}`} className={styles.img}/>
                    }
                })
                
            }
            <div className={styles.info}>
                <h4>{content.Title}</h4>
                <div className={styles.author}>
                    <img src={`http://localhost:2000/img?img=${author.photo}`} className={styles.authorImg} />
                    <h6>{`${author.name} ${author.surname}`}</h6>
                </div>
            </div>
        </div>
    )
}