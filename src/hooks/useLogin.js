import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/Config'
import { useAuthContext } from './useAuthContext'


    export const useLogin = () => {
        const [isCancelled, setIsCancelled] = useState(false)
        const [error, setError] = useState(null)
        const [isPending, setIsPending] = useState(false)
        const { dispatch } = useAuthContext()

        const login = async (email, password) => {
            setError(null)
            setIsPending(true)

            // Sign User In
            try {   
                const res = await projectAuth.signInWithEmailAndPassword(email, password)

                // Dispatch Logout Action
                dispatch({ type: 'LOGIN', payload: res.user })
                setIsPending(false)
                setError(null)

                // Update State
                if (!isCancelled) {
                    setIsPending(false)
                    setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

        useEffect(() => {
            return () => setIsCancelled(true)
        }, [])

        return { login, error, isPending }
    }