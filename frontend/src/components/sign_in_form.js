import React, { useEffect, useState } from "react";
import instance from "../modules/axiosInstance";
import Layout from "./layout";
import { Link, useNavigate } from "react-router-dom";


const SignInForm = () => {

    const navigate = useNavigate()

    const [isFormProcessing, setIsFormProcessing] = useState(false)

    // useEffect( () => {

    // }) set up to check if user is authenticated here already


    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = e.target.userName.value
        const userPassword = e.target.userPassword.value

        console.log(username, userPassword)
        try {
            const response = await instance.post('/login', {
                username: username,
                userPassword: userPassword
            })
            console.log(response.data.message)
            
            if (response.data.isAuthenticated) {
                navigate('/dashboard')
            }
            
        } catch(err) {
            console.log(err)

        }


    }
    return (
        <Layout>
        <div className='homeDiv'>
        <h1 className='appTitle'>Welcome to Membership App</h1>
        <form onSubmit={handleSubmit} style={{
            display:'flex',
            width: '100%',
            gap: '10px'
        }}>
            <div style={{
                display:'flex',
                flexDirection:'column'
            }}>
            <label htmlFor="userName">Username:</label>
            <input type="text" name="userName" id="userName"></input>
            <label htmlFor="userPassword">Password:</label>
            <input type='text' name='userPassword' id="userPassword"></input>
            </div>
            <div style={{
                justifyContent: 'flex-end',
                display: 'flex',
                flex: '1',
                alignItems: 'flex-end'
            }}>
                <button type="submit" style={{
                    padding: '10px',
                    maxWidth: '200px',
                    flex: '1'
                }}>Log In</button>
            </div>

        </form>
        <Link to='/signup' style={{
            textDecoration: 'none',
            color: '#38bdf8'
        }}>New user</Link>
        </div>
        </Layout>
    )
}

export default SignInForm