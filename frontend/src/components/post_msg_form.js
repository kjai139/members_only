import React, { useState } from "react";
import instance from "../modules/axiosInstance";
import Overlay from "./overlay";

const PostMsg = ({refresher}) => {

    const [isLoading, setIsLoading] = useState(false)


    const onSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const content = e.target.content.value

        try {
            const response = await instance.post('/message/create', {
                content: content
            }, {
                withCredentials: true
            })
            setIsLoading(false)
            e.target.reset()
            refresher(true)
            console.log(response.data.message)
        } catch(err) {
            console.log(err)
            setIsLoading(false)
        }

    }

    return (
        <div>
            {isLoading ? <Overlay loading={true}></Overlay> : null}
        <form className="postMsgForm" onSubmit={onSubmit}>
            
            <textarea className="postMsgTxtarea" name="content"></textarea>
            <div className="buttonsBar">
            <button>Submit</button>
            <button>Cancel</button>
            </div>
        </form>
        </div>
    )
}

export default PostMsg