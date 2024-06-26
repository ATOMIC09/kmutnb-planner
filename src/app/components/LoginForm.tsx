'use client'
import React, { useState } from 'react';
import { userLogin } from '@/app/lib/api';

export function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await userLogin(username, password);
    console.log('Login response:', res);
    // if (res.error) {
    //   console.log('Error logging in:', res.error);
    // } else {
    //   console.log('Login successful:', res);
    // }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="flex justify-center text-red-500 pt-2">
          {/* Display error message here */}

        </p>
      </form>
      <div className="text-center mt-4 text-sm text-gray-600">
        By logging in, you agree to our privacy policy. This is an open-source project.
      </div>
    </div>
  );
};

export default LoginForm;
