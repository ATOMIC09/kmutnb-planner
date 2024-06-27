import React, { useState } from 'react';
import { IconAlertTriangle } from '@tabler/icons-react'

export function ErrorPopup({ message }: { message: string }) {
    return (
        <div className="font-LINESeedSansTH_W_Rg flex flex-col items-center justify-center fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm">
            <div className='bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center'>
                <div className='mb-4'>
                    <IconAlertTriangle size={32} color="red" />
                </div>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <div className="font-LINESeedSansTH_W_Bd">อ๊ะ เกิดข้อผิดพลาด!</div>
                    <div className="block sm:inline">{message}</div>
                </div>
                <button className='mt-4 bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition' onClick={() => window.location.reload()}>ลองอีกครั้ง</button>
            </div>
        </div>
    );
};

export default ErrorPopup;
