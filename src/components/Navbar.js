// Elements
import { Link } from 'react-router-dom'

// Styles
import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>CashTrack</li>
                <li><Link to="/login">Log In</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
            </ul>
        </nav>
    )
}

