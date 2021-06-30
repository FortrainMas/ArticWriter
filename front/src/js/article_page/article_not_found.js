import styles from './article_not_found.module.css'

export default function ArticleNotFound(){
    return(
        <div className={styles.container}>
            <h1>404</h1>
            <h3>It seems, like we haven't got this article</h3>
        </div>
    )
}