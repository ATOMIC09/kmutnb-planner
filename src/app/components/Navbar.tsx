'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { userLogout } from '../lib/api';
import { useRouter } from 'next/navigation'
import { getUserInfo } from '@/app/lib/api';

export default function Navbar() {
  const router = useRouter()
  const [payload, setPayload] = useState<any>({});

  useEffect(() => {
    const decoded = getUserInfo();
    decoded.then((res) => {
      // console.log('User info:', res);
      setPayload(res);
      if (res.session !== "0") {
        router.push('/table');
      }
    });
  }, []);

  const handleLogout = () => {
    userLogout();
    router.push('/');
  }

  return (
    <nav className="font-LINESeedSansTH_W_Rg p-2 flex text-lg justify-between items-center bg-orange-600 shadow-lg">
      <Image src="/LOGO_Placeholder.png" alt="logo" width={50} height={50} />
      <div className='flex px-4 gap-4 items-center'>
        {payload?.username && <div className="text-white">สวัสดี! {payload?.username}</div>}
        {payload?.username && <button onClick={handleLogout} className="text-white bg-orange-700 hover:bg-red-900 rounded-md px-4 py-1 hover:scale-105 transition-all">ออกจากระบบ</button>}
      </div>
    </nav>
  );
};