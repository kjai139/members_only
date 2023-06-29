import React, { useEffect, useState } from "react";
import instance from "../modules/axiosInstance";
import Layout from "./layout";
import { Link, useNavigate } from "react-router-dom";
import ResultModal from "./resultModal";


const SignInForm = () => {

    const navigate = useNavigate()

    const [isFormProcessing, setIsFormProcessing] = useState(false)
    const [isAuth, setisAuth] = useState(false)
    const [errorMsg, setErrorMsg] = useState()

    

    useEffect( () => {
        
    }, []) 

    const isUserAuth = async () => {
        try {
            const response = await instance.post('/login/auth', {
                withCredentials: true
            })
            if (response.data.isAuthenticated) {
                console.log('user is authenticated, name:', response.data.user.name)
                
                navigate('/dashboard')
            } else {
                console.log('user is not authenticated')
                
            }
        }catch (err) {
            console.log(err)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = e.target.userName.value.toLowerCase()
        const userPassword = e.target.userPassword.value

        console.log(username, userPassword)
        try {
            const response = await instance.post('/login', {
                username: username,
                userPassword: userPassword
            }, {
                withCredentials: true
            })
            console.log(response.data.cookie, 'cookie upon sign in')
            
            if (response.data.isAuthenticated) {
                navigate('/dashboard')
                
            } else {
                e.target.reset()
                setErrorMsg(response.data.message)
            }
            
        } catch(err) {
            console.log(err)

        }


    }
    return (
        <Layout>
            <button onClick={isUserAuth}>CHECK AUTH</button>
        {errorMsg ? <ResultModal result={errorMsg} closeModal={() => setErrorMsg()}></ResultModal> : null}
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
            <input type="text" name="userName" id="userName" autoComplete="off"></input>
            <label htmlFor="userPassword">Password:</label>
            <input type='password' name='userPassword' id="userPassword"></input>
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