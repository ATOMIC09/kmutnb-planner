'use client'
import Timetable from '@/app/components/Timetable';

export default function Table() {
  return (
    <div className="font-LINESeedSansTH_W_Rg container p-4">
      <h1 className="text-2xl mb-4">ตารางเรียน</h1>
      <Timetable />
    </div>
  );
};