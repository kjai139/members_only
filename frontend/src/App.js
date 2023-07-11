import React from 'react';
import SignInForm from './components/sign_in_form';
import { useNavigate } from 'react-router-dom'


function App() {

  const navigate = useNavigate()

  const noLoginButton = () => {
    navigate('/dashboard')
  }
  return (
    
      <SignInForm></SignInForm>
      
  );
}

export default App;
