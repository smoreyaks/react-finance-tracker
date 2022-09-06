// Hooks
import { useState, useEffect } from "react"
import { projectFirestore } from "../firebase/Config"

export const useCollection = (collection) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        const unsubscribe = ref.onSnapshot((snapshot) => { 
            let results = [];
            snapshot.docs.forEach(doc => { 
                results.push({ ...doc.data, id: doc.id})
            })

            // Update State
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('could not fetch the data')
        })

        // Unsubscribe on mount
        return () => unsubscribe()

    }, [collection])

    return { documents, error}
}