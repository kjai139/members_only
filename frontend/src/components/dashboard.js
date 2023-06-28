import React, { useEffect, useState } from "react";
import instance from "../modules/axiosInstance";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {


    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect( () => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const response = await instance.get('/user/auth')
            if (response.data.isAuthenticated) {
                setUser(response.data.user)
            } else {
                navigate('/')
            }
        } catch(err) {
            console.log(err)
        }
        

    }
    return (
        <div>
            <h1>Welcome {user.name}</h1>
            <button>Log out</button>
        </div>
    )
}

export default Dashboard