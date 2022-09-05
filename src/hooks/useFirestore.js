// Add or Remove Documents to Firestore

// Firebase
import { projectFirestore } from '../firebase/Config'

// Hooks
import { useReducer, useEffect, useState } from 'react'

let initialState = { 
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer(state, action) => {
    switch (action.type) {
        default: 
            return state
    }
}


export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // Collection Reference
    const ref = projectFirestore.collection(collection).add()
    
    // Add New Document
    const addDocument = (doc) => {
        
    }

    const deleteDocument = (id) => {

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }

}
