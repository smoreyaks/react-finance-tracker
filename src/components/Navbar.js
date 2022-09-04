// Elements
import { Link } from 'react-router-dom'

// Styles
import styles from './Navbar.module.css'

// Hooks
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
    const { logout } =  useLogout()
    const { user } = useAuthContext()

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}><Link to="/">CashTrack</Link></li>
                { !user && (
                    <>
                        <li><Link to="/login">Log In</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </>
                )}
                { user && (
                    <>
                        <li>Welcome, {user.displayName}</li>
                        <li>
                            <button 
                                className='btn'
                                onClick={logout}
                                >
                                Log Out
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

