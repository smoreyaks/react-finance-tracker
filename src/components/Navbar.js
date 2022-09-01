// Elements
import { Link } from 'react-router-dom'

// Styles
import styles from './Navbar.module.css'

// Hooks
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
    const { logout } =  useLogout()
    
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>CashTrack</li>
                <li><Link to="/login">Log In</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li>
                    <button 
                        className='btn'
                        onClick={logout}
                        >
                        Log Out
                    </button>
                </li>
            </ul>
        </nav>
    )
}

