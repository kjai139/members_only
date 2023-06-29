import React, { useEffect, useState } from "react";
import instance from "../modules/axiosInstance";
import { useNavigate } from "react-router-dom";
import ResultModal from "./resultModal";

const Dashboard = () => {


    const [user, setUser] = useState()
    const [isResultOut, setIsResultOut] = useState(false)
    const [formResult, setFormResult] = useState()
    const navigate = useNavigate()

    useEffect( () => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const response = await instance.get('/login/auth', {
                withCredentials: true
            })
            if (response.data.isAuthenticated) {
                setUser(response.data.user)
            } else {
                console.log(response.data)
            }
        } catch(err) {
            console.log(err)
        }
        

    }

    const logOut = async () => {
        try {
            const response = await instance.post('/users/logout')
            setFormResult(response.data.message)
            setIsResultOut(true)

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h1>Welcome {user ? user.name : null}</h1>
            <button onClick={logOut}>Log out</button>
            {isResultOut? <ResultModal result={formResult} closeModal={() => navigate('/')}></ResultModal> : null}
        </div>
    )
}

export default Dashboard