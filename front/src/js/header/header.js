import styles from './header.module.css'

import {Link, withRouter} from 'react-router-dom'

function Header(){
    return(
        <div className={styles.container}>
            <div className={styles.main}>
                <h1>ArticWriter</h1>     
                <div className={styles.dropdown}>
                <span className={`material-icons-outlined`}>
                    arrow_drop_down
                </span>       
                </div>
            </div>
            <div className={styles.dropdownMenu}>
                <Link to="/">
                    <h4>Articles</h4>
                </Link>
                <Link to="/account">
                    <h4>Account</h4>
                </Link>
            </div>
        </div>
    )
}

export default withRouter(Header)