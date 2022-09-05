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
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR': 
            return { isPending: false, document: null, success: false, error: action.payload}
        default: 
            return state
    }
}


export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // Collection Reference
    const ref = projectFirestore.collection(collection).add()
    
    // Only dispatch if not Cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // Add New Document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })
    }
    
    try {
        const addedDocument = await ref.add(doc)
        dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument})
    }
    catch (err) {
        dispatchIfNotCancelled({ type: 'ERROR', payload: err.message})
    }
    
    // Delete Document
    const deleteDocument = async (id) => {

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }

}
