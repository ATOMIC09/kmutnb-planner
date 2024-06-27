import React, { useEffect, useState } from 'react';
import { fetchTimetable, fetchTimetableSub } from '../lib/api';
import { useRouter } from 'next/navigation';

const Timetable: React.FC = () => {
  const router = useRouter();
  const [year, setYear] = useState(2567);
  const [semester, setSemester] = useState(1);
  const [startDate, setStartDate] = useState('2024');
  const [endDate, setEndDate] = useState('2024-06-29');
  const [timetable, setTimetable] = useState<any[]>([]);
  const [timetableSub, setTimetableSub] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const timetableData = await fetchTimetable(year, semester);
      const timetableSubData = await fetchTimetableSub(year, semester, startDate, endDate);
      if (timetableData.status !== 200 || timetableSubData.status !== 200) {
        console.error('Error fetching timetable data:', timetableData.status, timetableSubData.status);
        if (timetableData.status === 500 || timetableSubData.status === 500) {
          router.push('/login');
        }

        return;
      }
      else {
        setTimetable(timetableData.data);
        setTimetableSub(timetableSubData.data);
        console.log('timetableData:', timetableData);
        console.log('timetableSubData:', timetableSubData);
      }
    };
    getData();
  }, [year, semester, startDate, endDate]);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = Array.from({ length: 16 }, (_, i) => 6 + i);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex space-x-4">
        <div>
          <label className="block mb-2">ปีการศึกษา</label>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="p-1 border border-gray-300 rounded">
            <option value={2567}>2567</option>
            <option value={2566}>2566</option>
            <option value={2565}>2565</option>
            <option value={2564}>2564</option>
            <option value={2563}>2563</option>
            <option value={2562}>2562</option>
            <option value={2561}>2561</option>
            <option value={2560}>2560</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">ภาคเรียน</label>
          <select value={semester} onChange={(e) => setSemester(Number(e.target.value))} className="p-1 border border-gray-300 rounded">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">วันที่เริ่มต้น</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-1 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block mb-2">วันที่สิ้นสุด</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-1 border border-gray-300 rounded" />
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2"></th>
              {hours.map((hour) => (
                <th key={hour} className="border border-gray-300 p-2 text-center">{`${hour}:00 - ${hour + 1}:00`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, dayIndex) => (
              <tr key={day}>
                <td className="border border-gray-300 p-2 text-center">{day}</td>
                {hours.map((hour) => (
                  <td key={`${dayIndex}-${hour}`} className="border border-gray-300 p-2 text-center">
                    {timetableSub.length > 0 &&
                      timetableSub
                        .filter((item) => item.weekday === dayIndex + 1 && item.tfrom <= hour && item.tto > hour)
                        .map((item, idx) => (
                          <div key={idx} className="bg-blue-200 p-1 rounded">
                            {item.coursecode} ({item.sectioncode}) {item.roomname}
                          </div>
                        ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h2 className="text-xl mb-2">รายวิชา</h2>
        <div className="space-y-2">
          {timetable.map((subject) => (
            <div key={subject.courseid} className="bg-green-200 p-2 rounded">
              {subject.coursecode} - {subject.coursename} ({subject.sectioncode})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
