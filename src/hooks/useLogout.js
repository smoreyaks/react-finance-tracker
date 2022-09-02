import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/Config'
import { useAuthContext } from './useAuthContext'


    export const useLogout = () => {
        const [isCancelled, setIsCancelled] = useState(false)
        const [error, setError] = useState(null)
        const [isPending, setIsPending] = useState(false)
        const { dispatch } = useAuthContext()

        const logout = async () => {
            setError(null)
            setIsPending(true)

            // Sign User Out
            try {   
                await projectAuth.signOut()

                // Dispatch Logout Action
                dispatch({ type: 'LOGOUT' })
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

        return { logout, error, isPending }
    }