// Hooks
import { useState } from "react"

export default function Form() {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({
            name,
            amount
        })
    }

    return (
        <>
            <h3>Add Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction Name:</span>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        />
                </label>
                <button>Add Transaction</button>
            </form>
        </>
    )
}
