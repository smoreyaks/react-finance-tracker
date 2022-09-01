// Firebase
import { projectAuth } from '../firebase/Config'
// Hooks
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    
    // State
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            // Sign Up
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)
            
            // No Response Error
            if (!res) {
                throw new Error('Could not complete Sign Up')
            }

            // Add Display Name to User
            await res.user.updateProfile({ displayName })
            
            // Dispatch Login Action
            dispatch({ type: 'LOGIN', payload: res.user })

            setIsPending(false)
            setError(null)
            

        }
        catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }

    return { signup, error, isPending  }

}