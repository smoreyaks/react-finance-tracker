// Hooks
import { useState, useEffect, useRef } from "react"
import { projectFirestore } from "../firebase/Config"

export const useCollection = (collection, _query ) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    const query = useRef(_query).current

    useEffect(() => {
        let ref = projectFirestore.collection( collection )

        // If we don't use a reference, an infinite loop in useEffect will occur
        // _query is an array and is "different" on every function call
        if (query) {
            ref = ref.where(...query)
        }

        const unsubscribe = ref.onSnapshot(snapshot => { 
            let results = [];
            snapshot.docs.forEach(doc => { 
                results.push({ ...doc.data(), id: doc.id})
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

    }, [collection, query])

    return { documents, error}
}