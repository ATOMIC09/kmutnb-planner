'use client'

export default function Home() {
  return (
    <div className="font-LINESeedSansTH_W_Rg container mx-auto p-4">
      <h1 className="text-2xl mb-4">ไปหน้าอื่น</h1>
      <div className="flex items-center space-x-4">
        <a href="/courses" className="bg-blue-500 text-white p-2 rounded hover:scale-105 transition">วิชาที่เปิดสอน</a>
        <a href="/timetable" className="bg-blue-500 text-white p-2 rounded hover:scale-105 transition">ตารางเรียน</a>
        <a href="/login" className="bg-blue-500 text-white p-2 rounded hover:scale-105 transition">เข้าสู่ระบบ</a>
      </div>
    </div>
  );
};