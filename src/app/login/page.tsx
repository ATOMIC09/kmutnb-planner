import React from 'react';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  // Replace 'Guest' with the actual username after login
  const username = 'Guest';

  return (
    <div className='font-LINESeedSansTH_W_Rg'>
      <Navbar username={username} />
      <LoginForm />
    </div>
  );
};