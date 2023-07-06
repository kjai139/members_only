import React, { useState } from "react";
import instance from "../modules/axiosInstance";
import ResultModal from "./resultModal";

const SecretModal = ({closeModal, setSuccess}) => {

    const [resultMsg, setResultMsg] = useState()
    const [isResultLoading, setIsResultLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsResultLoading(true)

        const answer = e.target.answer.value.toLowerCase()
        const response = await instance.post('/users/membership-auth', {
            answer: answer
        }, {
            withCredentials:true
        })
        console.log(response.data.message)
        if (response.data.success) {
            setIsSuccess(true)
            setResultMsg(response.data.message)
        } else {
            setResultMsg(response.data.message)
        }
        
        
        
    }
    const onCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    const onClose = () => {
        if (isSuccess) {
            closeModal()
            setSuccess()
        }
        closeModal()
        
    }

    return (
        <div className="overlay">
            {resultMsg ? <div className="secret-form"><h2>{resultMsg}</h2><button onClick={() => onClose()} >Close</button></div> : 
            <form className="secret-form" onSubmit={onSubmit}>
            <h2>Joey's father has three sons. John, Moe, and what's the name of his third son?</h2>
            <div style={{
                display:'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem'
            }}>
            <div className="secret-ui">
            <label htmlFor="answer">Answer:</label>
            <input type="text" name="answer" id="answer" min='1' autoComplete="off" style={{
                border:'2px solid black',
                padding:'2px'
            }}></input>
            </div>
            <div className="secret-ui">
                <button className="modal-btn" type="submit">Enter</button>
                <button className="modal-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
            </form>
            }
            
        </div>
    )
}

export default SecretModal