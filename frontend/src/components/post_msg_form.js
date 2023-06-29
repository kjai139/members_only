import React from "react";
import instance from "../modules/axiosInstance";

const PostMsg = () => {


    const onSubmit = async (e) => {
        e.preventDefault()

        const content = e.target.content.value

        try {
            const response = await instance.post('/message/post', {
                content: content
            })
        } catch(err) {
            console.log(err)
        }

    }

    return (
        <form className="postMsgForm">
            
            <textarea className="postMsgTxtarea" name="content"></textarea>
            <div className="buttonsBar">
            <button>Submit</button>
            <button>Cancel</button>
            </div>
        </form>
    )
}

export default PostMsg