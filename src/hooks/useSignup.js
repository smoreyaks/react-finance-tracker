// Firebase
import { projectAuth } from '../firebase/Config'

// Hooks
import { useState } from 'react'

export const useSignup = () => {
    
    // State
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)
            if (!res) {
                throw new Error('Could not complete Sign Up')
            }

            // Add Display Name to user
            await res.user.updateProfile({ displayName })
            setIsPending(false)
            setError(null)

        }
        catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }

    return { error, isPending, signup }

}