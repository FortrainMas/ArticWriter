import Post from '../post/post'

import styles from './mainPage.module.css'

import {useEffect, useState} from 'react'

export default function MainPage(){


    const postsq = [
        {
            id: 'dsfasdf',
            Author: 'Nikolay Petrov',
            AuthorId: 'qrewcelar',
            Rang: 23,
            Title: 'Sosi huy',
            Content: 'Etot pidoras zatrachal shumet'            
        },{},{},{},{},{},{},{},{},{}
    ]

    const [isLoaded, setIsLoaded] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        if(!isLoaded){
            fetch('http://localhost:2000/articles')
                .then(res=>{
                    console.log(`RE: ${res}`)
                    return res.json()})
                .then(
                    result=>{
                        setPosts(result)
                        setIsLoaded(true)
                    },
                    error => {
                        setIsLoaded(true)
                        console.log('Eba')
                        console.log(error)
                    }
                )
        }
    })



    return(
        <div className = {styles.container}>
            <h1>Recent posts</h1>
            <div className = {styles.content}>
                {
                    posts.map((post, i)=>{
                        return <Post content={post} key={i}/>
                    })
                }
            </div>
        </div>
    )
}