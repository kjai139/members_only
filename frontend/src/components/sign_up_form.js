import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import Layout from './layout'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Overlay from './overlay'
import { PacmanLoader } from 'react-spinners'
import ResultModal from './resultModal'
import instance from '../modules/axiosInstance'


const SignUpForm = () => {

    const navigate = useNavigate()

    
    const [isFormProcessing, setIsFormProcessing] = useState(false)
    const [isResultOut, setIsResultOut] = useState(false)
    const [formResult, setFormResult] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [isThereError, setIsThereError] = useState(false)

    

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsFormProcessing(true)

        const username = e.target.username.value
        const userPassword = e.target.userPassword.value
        try {
            const response = await instance.post('/users/create', {
                username: username,
                userPassword: userPassword
            })
            setIsFormProcessing(false)
            setFormResult(response.data.message)
            setIsResultOut(true)
            
            console.log(response.data)
        } catch(err) {
            setIsFormProcessing(false)
            console.log(err)
            setErrorMsg(err.response.data.errorMessage)
            setIsThereError(true)
            e.target.reset()
        }
        


        

    }

    return (
        <Layout>
            {isFormProcessing ? <Overlay loading={true}>
            </Overlay> : null}
            {isResultOut? <ResultModal result={formResult} closeModal={() => navigate('/')}></ResultModal> : null}
            {isThereError ? <ResultModal result={errorMsg} closeModal={() => setIsThereError(false)}></ResultModal>: null}
        
        <Link to='/'>Back to Login</Link>    
        <form className='signUpForm' onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' name='username' autoComplete='off' minLength='1'></input>
            <label htmlFor='userPassword'>Password</label>
            <input type='password' id='userPassword' name='userPassword' autoComplete='off' minLength='7'></input>
            <button className='submitBtn' type='submit'>Submit</button>

        </form>
        </Layout>
    )
}


export default SignUpForm