import React from 'react';
import Layout from './components/layout';
import SignInForm from './components/sign_in_form';
import { Link, useNavigate } from 'react-router-dom'


function App() {

  const navigate = useNavigate()

  const noLoginButton = () => {
    navigate('/dashboard')
  }
  return (
    <Layout>
      <h1 className='appTitle'>Welcome to Membership App</h1>
      <SignInForm></SignInForm>
      <Link to='/signup' style={{
        textDecoration: 'none',
        color: '#38bdf8'
      }}>New user</Link>
     
    </Layout>
  );
}

export default App;
