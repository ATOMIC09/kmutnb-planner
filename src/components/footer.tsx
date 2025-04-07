'use client'
import React from 'react';


export default function Footer() {
    return (
        <footer className="font-LINESeedSansTH_W_Rg p-2 bg-gray-200 shadow-lg mt-80 w-full">
            <div className='flex flex-col justify-center items-center text-center'>
                <div className="my-4 text-sm text-gray-600">
                    นี่คือเว็บที่ใช้สำหรับการจัดตารางเรียนเท่านั้น <b>มิใช่เว็บไซต์อย่างเป็นทางการของมหาวิทยาลัย</b> <br />และ<u>ไม่มี</u>การเปลี่ยนแปลงข้อมูลในระบบสารสนเทศเพื่องานทะเบียนนักศึกษา รวมถึง<u>ไม่มี</u>การเก็บข้อมูลส่วนบุคคลของผู้ใช้งาน
                </div>
                <div>
                    <a href="https://github.com/ATOMIC09/kmutnb-planner" target="_blank" className="text-sm text-gray-600 hover:text-black">สามารถตรวจสอบซอร์สโค้ดได้ที่นี่</a>
                </div>
            </div>
        </footer>
    );
};