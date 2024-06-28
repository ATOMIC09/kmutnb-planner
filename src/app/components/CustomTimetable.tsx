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
        classExam: ClassExam;
        coursecode: string;
        coursename: string;
        courseunit: string;
    }

    interface ClassExam {
        Midterm: ExamDetails | null;
        Final: ExamDetails | null;
    }
    
    interface ExamDetails {
        date: string;
        startExamTime: string;
        endExamTime: string;
    }

    const daysRow = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];
    const daysCheckCell = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];
    const hours = Array.from({ length: 16 }, (_, i) => 6 + i);
    const [extractedCourses, setExtractedCourses] = useState<ScheduleEntry[]>([]);
    
    useEffect(() => {
        const extracted = courses.flatMap((course) => extractClassInformation(course));
        setExtractedCourses(extracted);
    }, [courses]);
    
    const calculateColSpan = (startTime: number, endTime: number) => {
        return endTime - startTime;
    };
    
    const renderScheduleForDay = (day: string) => {
        const dayAbbreviation = daysCheckCell[daysRow.indexOf(day)];
        const scheduleEntriesForDay = extractedCourses.filter(course =>
            course.dayAbbreviation === dayAbbreviation
        );

        const convertTime = (time: string) => {
            const [hour, minute] = time.split('.');
            return `${hour.padStart(2, '0')}:${minute.padEnd(2, '0')}`;
        };
    
        scheduleEntriesForDay.sort((a, b) => parseInt(a.startTime) - parseInt(b.startTime));
    
        const cells = [];
        let currentTime = 6; // starting hour
    
        scheduleEntriesForDay.forEach(entry => {
            const startTime = parseInt(entry.startTime);
            const endTime = parseInt(entry.endTime);
    
            // Add empty cells if there's a gap between currentTime and startTime
            if (currentTime < startTime) {
                cells.push(
                    <td key={`empty-${currentTime}`} colSpan={startTime - currentTime} className="border border-gray-300 p-2"></td>
                );
            }
    
            // Render the schedule entry cell
            cells.push(
                <td key={`${entry.coursecode}-${startTime}`} colSpan={calculateColSpan(startTime, endTime)} className="border border-gray-300 p-2 text-center bg-yellow-100">
                    <div className="text-sm">
                        <div className="font-bold flex justify-between">
                            <div>{entry.coursecode} {entry.section}</div>
                            <div>{convertTime(entry.startTime)} - {convertTime(entry.endTime)}</div>
                        </div>
                        <div className="flex justify-between py-2">
                            <div>{entry.coursename}</div>
                        </div>
                        <div className="font-bold flex justify-between">
                            <div>{entry.room}</div>
                            <div>{entry.courseunit}</div>
                        </div>
                    </div>
                </td>
            );
    
            currentTime = endTime; // Update currentTime to endTime for next iteration
        });
    
        // Add empty cells to fill up until 22:00 if currentTime is less than 22
        if (currentTime < 22) {
            cells.push(
                <td key={`empty-${currentTime}`} colSpan={22 - currentTime} className="border border-gray-300 p-2"></td>
            );
        }
    
        return cells;
    };
    

    return (
        <div className="bg-orange-100 p-4 rounded-lg">
            <div className="overflow-x-auto">
                {courses.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2"></th>
                                {hours.map((hour) => (
                                    <th key={hour} className="border border-gray-300 p-2 text-center">{`${hour}:00`}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {daysRow.map((day) => (
                                <tr key={day} className="h-20"> {/* Set a fixed height for each row */}
                                    <td className="border border-gray-300 p-2">{day}</td>
                                    {renderScheduleForDay(day)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
