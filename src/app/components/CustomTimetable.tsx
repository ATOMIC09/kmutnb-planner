'use client'
import React, { useState, useEffect } from 'react';
import extractClassInformation from '../lib/extractClassInformation';

export default function CustomTimetable({ courses }: { courses: any[] }) {
    interface ScheduleEntry {
        section: string;
        dayAbbreviation: string;
        startTime: string;
        endTime: string;
        room: string;
        instructors: string[];
        classExam: {
            Midterm: any;
            Final: any;
        };
    }

    interface Extracted {
        coursecode: string;
        coursename: string;
        courseunit: string;
        scheduleEntries: ScheduleEntry[];
    }

    const daysRow = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];
    const daysCheckCell = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];
    const hours = Array.from({ length: 16 }, (_, i) => 6 + i);
    const [extractedCourses, setExtractedCourses] = useState<Extracted[]>([]);
    
    useEffect(() => {
        console.log('courses:', courses);
        const extracted: Extracted[] = courses.map((course) => extractClassInformation(course));
        console.log('extracted:', extracted);
        setExtractedCourses(extracted);
    }, [courses]);
        
    return (
        <div className="bg-orange-100 p-4 rounded-lg">
            <div className="overflow-x-auto">
                {courses.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2"></th>
                                {hours.map((hour) => (
                                    <th key={hour} className="border border-gray-300 p-2 text-center">{`${hour}:00 - ${hour + 1}:00`}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {daysRow.map((day) => (
                                <tr key={day}>
                                    <td className="border border-gray-300 p-2">{day}</td>
                                    {/* Match hours and add colspan to merge cell */}
                                    {hours.map((hour) => (
                                        <td key={hour} className="border border-gray-200 p-2">
                                            {extractedCourses.length > 0 &&
                                                extractedCourses
                                                    .map((course) => course.scheduleEntries)
                                                    .flat()
                                                    .filter((item) => item.dayAbbreviation === daysCheckCell[daysRow.indexOf(day)] && Number(item.startTime) <= hour && Number(item.endTime) > hour)
                                                    .map((item, idx) => (
                                                        <div key={idx} className="bg-blue-200 p-1 rounded">
                                                            <div>ตอนเรียน {item.section}</div>
                                                            <div>ห้อง {item.room}</div>
                                                            <div>เวลา {item.startTime}-{item.endTime}</div>
                                                        </div>
                                            ))}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};