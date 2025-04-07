import React, { useState, useEffect } from 'react';
import extractClassInformation from '@/lib/extractClassInformation';
import { useScreenshot } from 'use-react-screenshot';
import { Button } from './ui/button';
import { Printer } from "@mynaui/icons-react";

interface CourseTableProps {
    coursesResult: Course[];
}

interface Instructor {
    prefixname: string;
    officername: string;
    officersurname: string;
}

interface Course {
    classid: number;
    program: string | null;
    acadyear: string | null;
    semester: string | null;
    campusid: number;
    campusname: string;
    levelid: number;
    levelname: string;
    courseid: number;
    coursecode: string;
    revisioncode: string;
    coursename: string;
    coursenameeng: string | null;
    sectioncode: string;
    totalseat: number;
    enrollseat: number;
    classstatus: string;
    classstatusdes: string;
    classset: string;
    classsetdes: string;
    classnote: string;
    classinstructorname: string;
    classtime: string;
    classexam: string;
    courseunit: string;
    instructor: Instructor[];
}

export default function CoursesTimetable({ coursesResult }: CourseTableProps) {
    const ref = React.useRef<HTMLTableElement>(null);
    const [image, takeScreenshot] = useScreenshot();
    const [cellColor, setCellColor] = useState<string>('#fbd38d'); // Default background color
    const [textColor, setTextColor] = useState<string>('#000000'); // Default text color

    const getImage = () => {
        takeScreenshot(ref.current).then((capturedImage: string) => {
            if (capturedImage) {
                const link = document.createElement('a');
                link.href = capturedImage;
                link.download = 'timetable-screenshot.png';
                link.click();
            }
        });
    };

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
        const extracted = coursesResult.flatMap((course) => extractClassInformation(course));
        setExtractedCourses(extracted);
    }, [coursesResult]);
    
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
                <td
                    key={`${entry.coursecode}-${startTime}`}
                    colSpan={calculateColSpan(startTime, endTime)}
                    className="border border-gray-300 p-2 text-center"
                    style={{ backgroundColor: cellColor, color: textColor }} // Apply background and text colors
                >
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
        <div className="font-LINESeedSansTH_W_Rg p-4 rounded-lg">
            <div className="p-4 overflow-x-auto border-1 rounded-lg shadow-md">
                <h1 className="text-gray-700 text-2xl mb-4">ตารางเรียน</h1>
                <h1 className="text-red-500 text-md mb-4">แนะนำให้บันทึกภาพในโหมด Desktop เพราะยังเป็นเวอร์ชันทดสอบทำให้ยังมีบักแปลก ๆ</h1>
                {coursesResult.length > 0 && (
                    <table ref={ref} className="min-w-full divide-y divide-gray-200">
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
                {/* Tools */}
                {coursesResult.length > 0 && (
                    <div className="flex justify-center mt-4 space-x-4">
                        {/* Print timetable */}
                        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg border-1 shadow-lg">    
                            <label htmlFor="saveImage" className="text-gray-700 font-bold">บันทึกเป็นภาพ</label>
                            <Button
                                id="saveImage"
                                variant={'default'}
                                onClick={() => getImage()}
                                className="bg-blue-500 hover:bg-blue-700 hover:text-white transition-all duration-150 text-gray-50 font-bold p-2 rounded-lg"
                            >
                                <Printer />
                            </Button>  
                        </div>
                        
                        {/* Background Color Picker */}
                        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg border-1 shadow-lg">
                            <label htmlFor="cellColor" className="text-gray-700 font-bold">สีพื้นหลัง</label>
                            <input
                                id="cellColor"
                                type="color"
                                value={cellColor}
                                onChange={(e) => setCellColor(e.target.value)}
                                className="w-10 h-10"
                            />
                        </div>

                        {/* Text Color Picker */}
                        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg border-1 shadow-lg">
                            <label htmlFor="textColor" className="text-gray-700 font-bold">สีข้อความ</label>
                            <input
                                id="textColor"
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="w-10 h-10"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}