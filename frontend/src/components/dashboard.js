import React, { useEffect, useState } from "react";
import instance from "../modules/axiosInstance";
import { useNavigate } from "react-router-dom";
import ResultModal from "./resultModal";
import Layout from "./layout";
import PostMsg from "./post_msg_form";
import {format, parseISO} from 'date-fns'
import Overlay from "./overlay";
import SecretModal from "./secretModal";


const Dashboard = () => {


    const [user, setUser] = useState()
    const [isUserMember, setIsUserMember] = useState(false)
    const [isUserAdmin, setIsUserAdmin] = useState(false)
    const [isResultOut, setIsResultOut] = useState(false)
    const [formResult, setFormResult] = useState()
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [messagePosts, setMessagePosts] = useState()
    const [needRefresh, setNeedRefresh] = useState(false)

    const [isDeleting, setIsDeleting] = useState(false)
    
    const [isSecretOpen, setIsSecretOpen] = useState(false)
    
    const [deleteResult, setDeleteResult] = useState(false)
   

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
                
                
                // console.log('user', response.data.user) 
                if (response.data.user.membership_status === 'member') {
                    // console.log('user is member')
                    setIsUserMember(true)
                }
                if (response.data.user.membership_status === 'admin'){
                    // console.log('user is admin')
                    setIsUserMember(true)
                    setIsUserAdmin(true)

                
                } 
                // else {
                //     console.log('membership status:', response.data.user.membership_status)
                // }
            } else {
                // console.log(response.data)
                navigate('/')
            }
        } catch(err) {
            console.log(err)
        }
        

    }

    const deleteMsg = async (id) => {
        try {
            setIsDeleting(true)
            const response = await instance.delete(`/message/delete/${id}`)
            // console.log(response.data.message)
            setIsDeleting(false)
            setDeleteResult(response.data.message)
        } catch(err) {
            console.log(err)
            setIsDeleting(false)
        }
    }

    const checkMessages = async () => {
        try {
            const response = await instance.get(`/message/get?page=${currentPage}`, {
                withCredentials: true
            })

            // console.log(response.data.posts)
            // console.log(response.data.curpage)
            // console.log(response.data.posts)
            setMessagePosts(response.data.posts)
            setTotalPages(response.data.totalPages)
            // console.log('total pages', response.data.totalPages)
            setNeedRefresh(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = (state) => {
        // console.log(state)
        setNeedRefresh(state)
    }

    

    const logOut = async () => {
        try {
            const response = await instance.delete('/users/logout', {
                withCredentials:true
            })
            setFormResult(response.data.message)
            setIsResultOut(true)
            

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Layout>
            {isDeleting && <Overlay></Overlay>}
            {deleteResult && <ResultModal result={deleteResult} closeModal={() => {setDeleteResult(''); setNeedRefresh(true)}}></ResultModal>}
        <div className="dashboard-cont">
        <div>
            <h1>Welcome, {user ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : null}</h1>
            <button onClick={() => logOut()}>Log out</button>
            {isResultOut? <ResultModal result={formResult} closeModal={() => {navigate('/')}}></ResultModal> : null}
        </div>
        
        {isSecretOpen && <SecretModal closeModal={() => setIsSecretOpen(false)} setSuccess={()=> setIsUserMember(true)}></SecretModal>}
        <div>
            <h2>Secret Club Messages</h2>
            
            
            {/* <button onClick={checkMessages}>get posts button</button> */}
            <div className="post-outer-cont">
            {messagePosts ? messagePosts.map((node) => {

                const capName = node.poster.name.charAt(0).toUpperCase() + node.poster.name.slice(1)
                return (
                    <div className="post-container" key={node._id}>
                        <span className="postDate">{format(parseISO(node.createdAt), "EEEE, MMMM d, yyyy 'at' h:mm b")}
                        
                        { (isUserAdmin || (user && user._id) === node.poster._id) ? <button className="delete-btn" onClick={() => deleteMsg(node._id)}>Delete message</button> : null}
                        
                        </span>
                        <div style={{
                            display:"flex",
                            justifyContent: 'space-between',
                            gap: '1rem'
                        }}>
                            <span className="post-user-cont" style={{
                                
                                padding:'5px'
                            }}> {isUserMember? capName : 'Anon'}</span>
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
        {isUserMember ? <PostMsg refresher={handleUpdate}></PostMsg> : <div><h2>Only members can see names and post in the secret club forum</h2>
        <button onClick={() => setIsSecretOpen(true)}>I want to join the club</button></div>
        }

        
        </div>
        </Layout>
    )
}

export default Dashboard