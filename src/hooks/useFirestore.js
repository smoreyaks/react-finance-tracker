// Add or Remove Documents to Firestore

// Firebase
import { projectFirestore, timestamp } from "../firebase/Config"

// Hooks
import { useReducer, useEffect, useState } from "react"

let initialState = { 
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return {  success: false, isPending: true, error: null, document: null }
        case "ERROR": 
            return { success: false, isPending: false,  error: action.payload, document: null }
        case "ADDED_DOCUMENT":
            return { success: true, isPending: false,  error: null, document: action.payload }
        case "DELETED_DOCUMENT":
            return { success: true, isPending: false, error: null, document: null }
        default: 
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // Collection Reference
    const ref = projectFirestore.collection(collection)
    
    // Only dispatch if not Cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // Add New Document
    const addDocument = async (doc) => {
        dispatch({ type: "IS_PENDING" })
        
        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt})
            dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument})
        }
        
        catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message})
        }
    }
    
    
    // Delete Document
    const deleteDocument = async (id) => {
        dispatch({ type: "IS_PENDING" })

        try { 
            await ref.doc(id).delete()
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
        }

        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete' })
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }

}
