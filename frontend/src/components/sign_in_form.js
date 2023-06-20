import React from "react";


const SignInForm = () => {
    const handleSubmit = async (e) => {
        e.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit} style={{
            display:'flex',
            width: '100%',
            gap: '10px'
        }}>
            <div style={{
                display:'flex',
                flexDirection:'column'
            }}>
            <label htmlFor="userName">UserName:</label>
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
    )
}

export default SignInForm