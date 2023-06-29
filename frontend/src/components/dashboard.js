import React, { useEffect, useState } from "react";
import instance from "../modules/axiosInstance";
import { useNavigate } from "react-router-dom";
import ResultModal from "./resultModal";
import Layout from "./layout";
import PostMsg from "./post_msg_form";

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
        <Layout>
        <div className="dashboard-cont">
        <div>
            <h1>Welcome {user ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : null}</h1>
            <button onClick={logOut}>Log out</button>
            {isResultOut? <ResultModal result={formResult} closeModal={() => navigate('/')}></ResultModal> : null}
        </div>
        <div>
            <h2>Club messages</h2>
        </div>
        <div className="messageBoard">

        </div>
        <PostMsg></PostMsg>
        </div>
        </Layout>
    )
}

export default Dashboard