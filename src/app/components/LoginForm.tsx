'use client'
import React, { useState } from 'react';
import { useFormState } from 'react-dom'
import SubmitLogin from '@/app/login/actions';

const initialState = {
  message: '',
}

export function LoginForm() {
  const [state, formAction] = useFormState(SubmitLogin, initialState)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        action={formAction}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
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
          {state?.message}
      </p>
      </form>
      <div className="text-center mt-4 text-sm text-gray-600">
        By logging in, you agree to our privacy policy. This is an open-source project.
      </div>
    </div>
  );
};

export default LoginForm;
