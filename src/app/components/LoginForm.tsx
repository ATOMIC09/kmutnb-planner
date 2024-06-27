'use client'
import React, { useState } from 'react';
import { userLogin } from '@/app/lib/api';
import Link from 'next/link';

export function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  interface ErrorType {
    result: string;
  }
  
  const [error, setError] = useState<ErrorType>({ result: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res: any = await userLogin(username, password);
    if (res.status === 200) {
      console.log('Login successful:', res.data);
    }
    else {
      // console.error('Login failed:', res.data);
      setError(res.data);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-80 border"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl mb-2 text-center">เข้าสู่ระบบ</h2>
        <h3 className="text-sm mb-6 text-center">ใช้บัญชี ICIT ในการลงชื่อเข้าใช้</h3>
        <div className="mb-4">
          <label className="block mb-1">ชื่อบัญชี</label>
          <input
            type="text"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">รหัสผ่าน</label>
          <input
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
          <div className='text-xs text-center mb-8'>
            <p>
            ทำไมต้องเข้าสู่ระบบ?
          </p>
          <p>
            เพื่อให้ระบบดึงข้อมูลจากหลักสูตรที่คุณได้ลงทะเบียนไว้
          </p>
        </div>
        
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-red-700 hover:scale-105 transition-all"
        >
          ลงชื่อเข้าใช้
        </button>
        <Link href="/">
          <div className="text-xs text-center mt-4">
            กลับหน้าหลัก
          </div>
        </Link>
        {error && error.result && <div className="text-red-500 text-sm font-bold mt-4 text-center">เกิดข้อผิดพลาดขึ้น!</div>}
        {error && error.result && <div className="text-red-500 text-sm text-center">{error.result}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
