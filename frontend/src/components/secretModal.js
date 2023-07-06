import React from "react";
import instance from "../modules/axiosInstance";

const SecretModal = ({closeModal}) => {

    const onSubmit = (e) => {
        e.preventDefault()
        
    }
    const onCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="overlay">
            <form className="secret-form" onSubmit={onSubmit}>
                <h2>Joey's father has three sons. John, Moe, and what's the name of his third son?</h2>
                <div style={{
                    display:'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <div>
                <label htmlFor="answer">Answer:</label>
                <input type="text" name="answer"></input>
                </div>
                <div>
                <button className="modal-btn" type="submit">Enter</button>
                <button className="modal-btn" onClick={onCancel}>Cancel</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default SecretModal