import React from 'react'
import axios from 'axios'
import { useState } from 'react'


const SignUpForm = () => {

    const [isFormSubmitted, setIsFormSubmitted] = useState(false)


    return (
        <div id='App'>
        <form className='signUpForm'>
            <label htmlFor='userNameCreate'>Username</label>
            <input type='text' id='userNameCreate' name='userNameCreate'></input>
            <label htmlFor='userPasswordCreate'>Password</label>
            <input type='number' id='userPasswordCreate' name='userPasswordCreate'></input>
            <button type='submit'>Create Account</button>

        </form>
        </div>
    )
}


export default SignUpForm