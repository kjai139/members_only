import React, { useEffect, useState } from "react";
import instance from "../modules/axiosInstance";
import Layout from "./layout";
import { Link, useNavigate } from "react-router-dom";
import ResultModal from "./resultModal";
import Overlay from "./overlay";



const SignInForm = () => {

    const navigate = useNavigate()

    const [isFormProcessing, setIsFormProcessing] = useState(false)
    
    const [errorMsg, setErrorMsg] = useState()

    

    useEffect( () => {
        isUserAuth()
    }, []) 

    const isUserAuth = async () => {
        try {
            // setIsFormProcessing(true)
            const response = await instance.get('/login/check', {
                withCredentials: true
            })
            if (response.data.isAuthenticated) {
                // console.log('user is authenticated, name:', response.data.user.name)
                // setIsFormProcessing(false)
                navigate('/dashboard')
            } else {
                // setIsFormProcessing(false)
                // console.log('user is not authenticated')
                
            }
        }catch (err) {
            console.log(err)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = e.target.userName.value.toLowerCase()
        const userPassword = e.target.userPassword.value

        // console.log(username, userPassword)
        try {
            setIsFormProcessing(true)
            const response = await instance.post('/login', {
                username: username,
                userPassword: userPassword
            }, {
                withCredentials: true
            })
            // console.log(response.data.cookie, 'cookie upon sign in')
            
            if (response.data.isAuthenticated) {
                setIsFormProcessing(false)
                navigate('/dashboard')
                
            } else {
                setIsFormProcessing(false)
                e.target.reset()
                setErrorMsg(response.data.message)
            }
            
        } catch(err) {
            setIsFormProcessing(false)
            console.log(err)

        }


    }
    return (
        <Layout>
            {/* <button onClick={isUserAuth}>CHECK AUTH</button> */}
        {errorMsg ? <ResultModal result={errorMsg} closeModal={() => setErrorMsg()}></ResultModal> : null}
        <div className='homeDiv'>
            {isFormProcessing && <Overlay loading={true}></Overlay>}
        <h1 className='appTitle'>Welcome to the Private Membership Club</h1>
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
                <button className='signIn-btn' type="submit">Log In</button>
            </div>

        </form>
        <Link to='/signup' style={{
            textDecoration: 'none',
            
        }}>New user</Link>
        </div>
        </Layout>
    )
}

export default SignInForm