import React from 'react';

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

export default function CoursesSelectedTable({ coursesResult }: CourseTableProps) {
    return (
    <div className="font-LINESeedSansTH_W_Rg p-4 rounded-lg">
        <h1 className="text-2xl mb-4">วิชาที่เลือกแล้ว</h1>

        <div className="overflow-x-auto">
            {coursesResult.length > 0 &&
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                            รหัสวิชา
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                            ชื่อวิชา
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                            ตอนเรียน
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                            จำนวนที่นั่ง
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                            วันเวลาเรียน
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                            วันเวลาสอบ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                            ผู้สอน
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                            วิทยาเขต
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                            ระดับ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                            กลุ่มเรียน
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                            สถานะรายวิชา
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {coursesResult.map((course) => (
                    <tr key={course.classid}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {course.coursecode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.coursename}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.sectioncode}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-LINESeedSansTH_W_Bd ${(course.enrollseat / course.totalseat) < 0.5
                            ? 'text-green-500'
                            : (course.enrollseat / course.totalseat) < 0.8
                            ? 'text-yellow-500'
                            : (course.enrollseat / course.totalseat) < 1
                                ? 'text-orange-600'
                                : 'text-red-900'
                            }`}
                        >
                            <div className='flex flex-col items-center'>
                            <div>
                                {course.enrollseat}/{course.totalseat}
                            </div>
                            <div>
                                {`${(course.enrollseat / course.totalseat) === 1 ? '(เต็ม)' : ''}`}
                            </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.classtime.split('<br>').map((schedule: string, index: number) => (
                            <p key={index}>{schedule.includes('ห้อง') ? `• ${schedule}` : schedule}</p>
                            ))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.classexam.split('<br>').map((schedule: string, index: number) => (
                            <p key={index}>{schedule}</p>
                            ))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.classinstructorname.split('<LI>').map((instructor: string, index: number) => (
                            <p key={index}>{instructor}</p>
                            ))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.campusname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.levelname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.classsetdes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.classstatusdes}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            }
            {coursesResult.length === 0 && <div className="py-8 text-center mt-4">รอการเลือกรายวิชา</div>}
        </div>
    </div>
    );
};