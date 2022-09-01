import { useState } from 'react'
import { projectAuth } from '../firebase/Config'
import { useAuthContext } from './useAuthContext'


    const useLogout = () => {
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
            }
            catch (err) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }

        return { logout, error, isPending }
    }