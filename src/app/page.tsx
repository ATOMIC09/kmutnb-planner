'use client'

import Timetable from '@/app/components/Timetable';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Study Timetable</h1>
      <Timetable />
    </div>
  );
};