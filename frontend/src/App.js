import React from 'react';
import Layout from './components/layout';
import SignUpForm from './components/sign_in_form';
import { useNavigate } from 'react-router-dom'


function App() {

  const navigate = useNavigate()

  const noLoginButton = () => {
    navigate('/dashboard')
  }
  return (
    <Layout>
      <h1 className='appTitle'>Welcome to Membership App</h1>
      <SignUpForm></SignUpForm>
      <button onClick={noLoginButton}>Test route</button>
     
    </Layout>
  );
}

export default App;
