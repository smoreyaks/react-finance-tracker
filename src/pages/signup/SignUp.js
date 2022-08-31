// Hooks
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// Styles
import styles from './SignUp.module.css'

export default function SignUp() {
    
    // State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const { signup, isPending, error } = useSignup()

    // Handle Functions
    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName)
    }

    return (
        <form 
            className={styles.['signup-form']} 
            onSubmit={handleSubmit}
        >
            <h2>Sign Up</h2>
            <label>
                <span>Email:</span>
                <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    />
            </label>
            <label>
                <span>Password:</span>
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    />
            </label>
            <label>
                <span>Display Name:</span>
                <input 
                    type="text" 
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    required
                    />
            </label>
            { !isPending &&  <button className="btn">Sign Up</button> }
            { isPending && <button className="btn" disabled>Loading...</button>}
            { error && <p>{ error }</p>}
        </form>
    )
}
