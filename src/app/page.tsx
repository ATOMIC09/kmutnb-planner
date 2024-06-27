'use client'
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-LINESeedSansTH_W_Rg container mx-auto p-4 ">
      <div>
        <div className="flex justify-center items-end gap-2">
          <h1 className="text-2xl mb-4">ไปหน้าอื่น</h1>
          <h2 className="text-sm mb-4">(ทำชั่วคราว ยังนึกไม่ออก)</h2>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <Link href="/courses" className="bg-orange-500 text-white p-2 rounded hover:scale-105 transition">วิชาที่เปิดสอน (ใช้งานได้)</Link>
          <Link href="/table" className="bg-orange-500 text-white p-2 rounded hover:scale-105 transition">ตารางเรียน (ต้องหา token ใส่เอง)</Link>
          <Link href="/login" className="bg-orange-500 text-white p-2 rounded hover:scale-105 transition">เข้าสู่ระบบ (encryption พัง)</Link>
        </div>
      </div>
      

      <div className="my-20 flex justify-center">
        <Image src="https://i.redd.it/dwfxyvagv7j01.jpg" alt="logo" width={1000} height={1000}/>
      </div>
    </div>
  );
};