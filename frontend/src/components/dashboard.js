import React, { useEffect, useState } from "react";
import instance from "../modules/axiosInstance";
import { useNavigate } from "react-router-dom";
import ResultModal from "./resultModal";
import Layout from "./layout";
import PostMsg from "./post_msg_form";
import {format, parseISO} from 'date-fns'

const Dashboard = () => {


    const [user, setUser] = useState()
    const [isResultOut, setIsResultOut] = useState(false)
    const [formResult, setFormResult] = useState()
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [messagePosts, setMessagePosts] = useState()
    const [needRefresh, setNeedRefresh] = useState(false)

    useEffect( () => {
        checkAuth()
        checkMessages()
    }, [])

    useEffect( () => {
        if (needRefresh) {
            checkMessages()

        }
    }, [needRefresh])

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

    const checkMessages = async () => {
        try {
            const response = await instance.get(`/message/get?page=${currentPage}`, {
                withCredentials: true
            })

            // console.log(response.data.posts)
            console.log(response.data.curpage)
            console.log(response.data.posts)
            setMessagePosts(response.data.posts)
            setNeedRefresh(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = (state) => {
        console.log(state)
        setNeedRefresh(state)
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
            
            <button onClick={checkMessages}>get posts button</button>
            <div className="post-outer-cont">
            {messagePosts ? messagePosts.map((node) => {
                return (
                    <div className="post-container" key={node._id}>
                        <span className="postDate">{format(parseISO(node.createdAt), "EEEE, MMMM d, yyyy 'at' h:mm b")}</span>
                        <div style={{
                            display:"flex",
                            justifyContent: 'space-between',
                            gap: '1rem'
                        }}>
                            <span className="post-user-cont" style={{
                                
                                padding:'5px'
                            }}> {node.poster.name}</span>
                            <span className="post-content-cont" style={{
                                flexGrow: '1',
                                padding:'5px'

                            }}>{node.content}</span>
                        </div>
                    </div>
                )
            }) : null}
            </div>
        </div>
        <div className="messageBoard">

        </div>
        <PostMsg refresher={handleUpdate}></PostMsg>
        </div>
        </Layout>
    )
}

export default Dashboard