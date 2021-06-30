import styles from './createArticle.module.css'

import {useState, useRef} from 'react'

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function CreateArticle(){

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loadImageText, setloadImageText] = useState('Add image')

    const [publishingStatus, setPublishingStatus] = useState(null)

    const fileForm = useRef(null)
    const openFileLoader = ()=>{
        fileForm.current.click()
    }

    //Upload article image to the server
    const loadImage = async (image)=>{
        
        let formData = new FormData();
        formData.append('img', image);

        const queryBody = {
            method: 'POST',
            headers: {enctype: "multipart/form-data"},
            body: formData
        }

        
        const result = await (await fetch(`http://localhost:2000/img/load`, queryBody)).json()
        return result.filename
    }

    const publish = async ()=>{
        const login = cookies.get('login')
        const password = cookies.get('password')

        const article = {login, password, title, content}

        if(fileForm.current.files[0]){
            article.photo = await loadImage(fileForm.current.files[0])
        }

        const queryBody = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(article)
        }
        fetch('http://localhost:2000/articles/create', queryBody)
            .then(res => res.json())
            .then(res=>{
                if(res.error == null){
                    setPublishingStatus('Your article succefully published')
                }else if(res.error = 'Invalid user data'){
                    setPublishingStatus('You are not logged in')
                }else if(res.error = 'There is no content or title'){
                    setPublishingStatus('There is no contetn or title')
                }else{
                    setPublishingStatus('Some error has occurred on our side')
                }
            })
    }

    return(
        <div className={styles.container}>
            <div className={!publishingStatus?styles.undisplayed:styles.publishingStatus}>
               <h3>{publishingStatus}</h3> 
            </div>
            <input type="text" value={title} placeholder={'Call your article'} onInput={({target})=>{setTitle(target.value)}}/>
            <textarea placeholder="And just start to write..." value={content} onInput={({target}) => {setContent(target.value)}}/>
            <button className={styles.button} onClick={openFileLoader}>
                <input type="file" ref={fileForm} className={styles.file} onChange={
                    ()=>{
                        setloadImageText(`Image is ready. ${fileForm.current.files[0].name}`)
                    }}
                />
                <h3>{loadImageText}</h3>
            </button>
            <button className={styles.button} onClick={publish}>
                <h3>Publish</h3>
            </button>
        </div>
    )
}