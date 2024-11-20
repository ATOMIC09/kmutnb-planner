import React, { useEffect, useState } from 'react';
import parseClassInformation from '@/lib/extractClassInformation';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

export default function CourseTable({ coursesResult }: CourseTableProps) {
    const [pageSize, setPageSize] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterText, setFilterText] = useState<string>('');
    const [showAllFiltered, setShowAllFiltered] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<any[]>([]);
    const [conflictError, setConflictError] = useState<any[]>([]);

    // Reset filter
    useEffect(() => {
        // Reset search filter
        setFilterText('');
        setPageSize(10);
        setShowAllFiltered(false);
        setCurrentPage(1);
    }, [coursesResult]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Adjusted handlePageSizeChange function to toggle showAllFiltered state
    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Reset currentPage to 1 when changing page size to show all
        if (e.target.value === String(coursesResult.length)) {
            setCurrentPage(1);
        }
        const size = Number(e.target.value);
        setPageSize(size);
        if (size === coursesResult.length) {
            setShowAllFiltered(true);
        } else {
            setShowAllFiltered(false);
            setCurrentPage(1);
        }
    };

    const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value);
        setPageSize(coursesResult.length);
        if (e.target.value === '') {
            setPageSize(10);
            setShowAllFiltered(false);
            setCurrentPage(1);
        }
        else {
            setShowAllFiltered(true);
        }
    };

    const paginatedCourses = coursesResult.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const filteredCourses = paginatedCourses.filter((course) =>
        course.coursename.toLowerCase().includes(filterText.toLowerCase()) ||
        course.coursecode.toLowerCase().includes(filterText.toLowerCase()) ||
        course.sectioncode.toLowerCase().includes(filterText.toLowerCase()) ||
        course.classinstructorname.toLowerCase().includes(filterText.toLowerCase()) ||
        course.classtime.toLowerCase().includes(filterText.toLowerCase()) ||
        course.classexam.toLowerCase().includes(filterText.toLowerCase()) ||
        course.classsetdes.toLowerCase().includes(filterText.toLowerCase()) ||
        course.classstatusdes.toLowerCase().includes(filterText.toLowerCase()) ||
        course.campusname.toLowerCase().includes(filterText.toLowerCase()) ||
        course.levelname.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleAddSelectRow = (rowData: any) => {
        setConflictError([]);
        // Check for duplicates
        if (!selectedData.some((data) => data.classid === rowData.classid)) {
            // Extract class information
            const classInfo = parseClassInformation(rowData);

            // Check for classtime conflicts
            const selectedClassTimes = selectedData.map((data) => parseClassInformation(data));
            const newClassTimes = classInfo;
            const isConflict = selectedClassTimes.some((selectedClassTime) =>
                selectedClassTime.some((selectedSchedule) =>
                    newClassTimes.some((newSchedule) =>
                        selectedSchedule.dayAbbreviation === newSchedule.dayAbbreviation &&
                        (
                            (newSchedule.startTime >= selectedSchedule.startTime && newSchedule.startTime < selectedSchedule.endTime) ||
                            (newSchedule.endTime > selectedSchedule.startTime && newSchedule.endTime <= selectedSchedule.endTime) ||
                            (newSchedule.startTime <= selectedSchedule.startTime && newSchedule.endTime >= selectedSchedule.endTime)
                        )
                    )
                )
            );

            if (isConflict) {
                // Find the conflicting times return as array of conflict objects
                const conflictingTimes = selectedClassTimes.map((selectedClassTime, index) => {
                    const conflictingSchedules = selectedClassTime.filter((selectedSchedule) =>
                        newClassTimes.some((newSchedule) =>
                            selectedSchedule.dayAbbreviation === newSchedule.dayAbbreviation &&
                            (
                                (newSchedule.startTime >= selectedSchedule.startTime && newSchedule.startTime < selectedSchedule.endTime) ||
                                (newSchedule.endTime > selectedSchedule.startTime && newSchedule.endTime <= selectedSchedule.endTime) ||
                                (newSchedule.startTime <= selectedSchedule.startTime && newSchedule.endTime >= selectedSchedule.endTime)
                            )
                        )
                    );
                    return {
                        tobeselected: selectedData[index],
                        conflictwith: conflictingSchedules
                    };
                });
                setConflictError(findConflictErrorProp(conflictingTimes));
                return;
            }
            setSelectedData([...selectedData, rowData]);
        }
    };

    const handleRemoveSelectRow = (rowData: any) => {
        setConflictError([]);
        setSelectedData(selectedData.filter((data) => data.classid !== rowData.classid));
    }

    const findConflictErrorProp = (errorProp: any) => {
        const error = errorProp.find((error: any) => error.conflictwith.length > 0);
        return error.conflictwith;
    }

    return (
        <main className="font-LINESeedSansTH_W_Rg text-gray-700 p-4 w-screen">
            <div className="p-4 mt-4 border-1 rounded-lg shadow-md mx-auto">
                <div className="mt-4">
                    {/* Courses List Section */}
                    <div className="flex flex-col sm:flex-row justify-between lg:items-end items-start">
                        {/* Result counter */}
                        <div className="flex flex-row lg:flex-col mb-4 items-end lg:items-start">
                            <div>
                                {coursesResult.length > 0 && <h2 className="text-xl">ผลการค้นหา</h2>}
                            </div>
                            <div>
                                {coursesResult.length > 0 && <p className="text-sm pl-2 lg:pl-0">ทั้งหมด {coursesResult.length} รายการ</p>}
                            </div>
                        </div>

                        {/* Search by result */}
                        {coursesResult.length > 0 && (
                            <div className="md:flex md:justify-end w-full">
                                <div className="gap-4 mb-4">
                                    <Input
                                        type="text"
                                        value={filterText}
                                        onChange={handleFilterTextChange}
                                        placeholder="ค้นหาจากผลลัพธ์"
                                        className="p-1 border border-gray-300 rounded-lg text-sm w-full md:w-60 h-12 md:h-9"
                                    />
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Courses Table */}
                    {coursesResult.length > 0 &&
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-md font-LINESeedSansTH_W_Bd text-gray-500 uppercase tracking-wider">
                                            เลือกวิชา
                                        </th>
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
                                    {showAllFiltered ? (
                                        filteredCourses.map((course) => (
                                            <tr key={course.classid} className={`${conflictError.some((error: any) => error.coursecode === course.coursecode) ? 'bg-red-200' : ''}`} >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {!selectedData.some((data) => data.classid === course.classid) ? (
                                                        <Button
                                                            variant={'outline'}
                                                            onClick={() => handleAddSelectRow(course)}
                                                            className="bg-orange-600 hover:bg-red-700 transition-all duration-150 text-white py-3 px-4 rounded-lg"
                                                        >
                                                            เลือก
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant={'outline'}
                                                            onClick={() => handleRemoveSelectRow(course)}
                                                            className="bg-gray-300 hover:bg-gray-400 transition-all duration-150 text-gray-500 font-bold py-3 px-4 rounded-lg"
                                                        >
                                                            เลือกแล้ว
                                                        </Button>
                                                    )
                                                    }
                                                </td>
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
                                                        <p className={`${conflictError.some((error: any) => error.coursecode === course.coursecode) ? 'text-red-500' : ''}`} key={index}>{schedule.includes('ห้อง') ? `• ${schedule}` : schedule}</p>
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
                                        ))
                                    ) : (
                                        paginatedCourses.map((course) => (
                                            <tr key={course.classid} className={`${conflictError.some((error: any) => error.coursecode === course.coursecode) ? 'bg-red-200' : ''}`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {!selectedData.some((data) => data.classid === course.classid) ? (
                                                        <Button
                                                            variant={'outline'}
                                                            onClick={() => handleAddSelectRow(course)}
                                                            className="bg-orange-600 hover:bg-red-700 hover:text-white transition-all duration-150 text-white py-3 px-4 rounded-lg"
                                                        >
                                                            เลือก
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant={'outline'}
                                                            onClick={() => handleRemoveSelectRow(course)}
                                                            className="bg-gray-300 hover:bg-gray-400 hover:text-white transition-all duration-150 text-gray-500 font-bold py-3 px-4 rounded-lg"
                                                        >
                                                            เลือกแล้ว
                                                        </Button>
                                                    )
                                                    }
                                                </td>
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
                                                        <p className={`${conflictError.some((error: any) => error.coursecode === course.coursecode) ? 'text-red-500' : ''}`} key={index}>{schedule.includes('ห้อง') ? `• ${schedule}` : schedule}</p>
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
                                        ))
                                    )}
                                </tbody>
                            </table>
                            {filteredCourses.length === 0 && <div className="py-8 text-center mt-4">ไม่เจออะไรเลย พิมพ์ผิดรึเปล่า 🤔</div>}
                        </div>
                    }

                    {/* Pagination Controls */}
                    {coursesResult.length > 0 && !showAllFiltered && (
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                <label className="mr-2">แสดง</label>
                                <select value={pageSize} onChange={handlePageSizeChange} className="p-1 border border-gray-300 rounded-lg">
                                    <option value={10}>10</option>
                                    <option value={30}>30</option>
                                    <option value={50}>50</option>
                                    <option value={coursesResult.length}>แสดงทั้งหมด</option>
                                </select>
                                <span className="ml-2">รายการ</span>
                            </div>
                            {conflictError.length > 0 && (
                                <div className="flex items-center font-LINESeedSansTH_W_Bd">
                                    <span className="text-red-500">เวลาเรียนซ้อนทับกับวิชา {conflictError[0].coursename}</span>
                                </div>
                            )
                            }
                            <div>
                                <Button
                                    variant={'outline'}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border border-gray-300 rounded-lg mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    ก่อนหน้า
                                </Button>
                                <span>หน้า {currentPage} / {Math.ceil(coursesResult.length / pageSize)}</span>
                                <Button
                                    variant={'outline'}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(coursesResult.length / pageSize)}
                                    className="px-3 py-1 border border-gray-300 rounded-lg ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    ถัดไป
                                </Button>
                            </div>
                        </div>
                    )}
                    {/* Check if lecture time is conflict */}
                    {coursesResult.length > 0 && showAllFiltered && (
                        <div className="mt-4">
                            {conflictError.length > 0 && (
                                <div className="flex items-center font-LINESeedSansTH_W_Bd justify-center">
                                    <span className="text-red-500">เวลาเรียนซ้อนทับกับวิชา {conflictError[0].coursename}</span>
                                </div>
                            )
                            }
                        </div>
                    )}

                    {/* Check if midterm/final exam time is conflict (To be develop) */}

                </div>
            </div>
        </main>
    );
}

