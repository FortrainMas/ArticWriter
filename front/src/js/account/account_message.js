import styles from './account_message.module.css'
import {Link} from 'react-router-dom'

export default function AccountMessage({messageType}){    
    return(
        <div className={styles.container}>
            <div className = {styles.textBlock}>
                <h2>
                    {
                        messageType == 'error'?
                        "We don't know who is guilty, but please try to reload the page. If it does not help, re-enter your account or try later":
                        "You have to sign in"
                    }
                </h2>
            </div>

            <Link to="/signin" className={styles.sigin}>
                <h2>SIGN IN</h2>
            </Link>
        </div>
    )
}