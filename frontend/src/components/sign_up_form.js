import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import Layout from './layout'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const SignUpForm = () => {

    const navigate = useNavigate()

    
    const [isFormProcessing, setIsFormProcessing] = useState(false)
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const instance = axios.create({
        baseURL: 'http://localhost:4000'
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = e.target.username.value
        const userPassword = e.target.userPassword.value
        try {
            const response = await instance.post('/users/create', {
                username: username,
                userPassword: userPassword
            })
            console.log(response.data)
        } catch(err) {
            console.log(err)
        }
        


        console.log(username, userPassword)

    }

    return (
        <Layout>
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