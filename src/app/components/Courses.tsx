import React, { useState, useEffect } from 'react';
import { fetchCourses, fetchDepartments } from '../lib/api';
import { IconLoader } from '@tabler/icons-react';

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [academicYear, setAcademicYear] = useState<number>(2567);
  const [semester, setSemester] = useState<number>(1);
  const [campus, setCampus] = useState<number>(10);
  const [level, setLevel] = useState<number>(61);
  const [faculty, setFaculty] = useState<number>(0);
  const [department, setDepartment] = useState<number>(0);
  const [departments, setDepartments] = useState<any[]>([]);
  const [courseCode, setCourseCode] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterText, setFilterText] = useState<string>('');
  const [showAllFiltered, setShowAllFiltered] = useState<boolean>(false);

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const coursesData = await fetchCourses(
        academicYear,
        semester,
        campus,
        level,
        faculty,
        department,
        courseCode,
        courseName
      );
      setCourses(coursesData);
      console.log('coursesData:', coursesData);
    } catch (error) {
      console.error('Error fetching courses data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getDepartments = async (facultyId: number) => {
      try {
        const departmentsData = await fetchDepartments(facultyId);
        setDepartments(departmentsData);
        if (facultyId === 0) {
          setDepartment(0);
        } else {
          setDepartment(departmentsData[0].comboid);
        }
        console.log('departmentsData:', departmentsData);
      } catch (error) {
        console.error('Error fetching departments data:', error);
      }
    };
    getDepartments(faculty);
  }, [faculty]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Adjusted handlePageSizeChange function to toggle showAllFiltered state
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(e.target.value);
    setPageSize(size);
    if (size === courses.length) {
      setShowAllFiltered(true);
    } else {
      setShowAllFiltered(false);
      setCurrentPage(1);
    }
  };

  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    setPageSize(courses.length);
    console.log('filterText:', e.target.value);
    if (e.target.value === '') {
      setPageSize(10);
      setShowAllFiltered(false);
      setCurrentPage(1);
    }
    else {
      setShowAllFiltered(true);
    }
  };

  const paginatedCourses = courses.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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

  return (
    <div className="bg-orange-100 p-4 rounded-lg">
      <h1 className="text-2xl mb-4">วิชาที่เปิดสอน</h1>

      <div className="flex items-center justify-center w-full">
        {/* Input Section */}
        <div className="space-y-4 w-full">
          <div className='flex gap-4'>
            <div className="flex-col items-center">
              <label className="block mb-2">ปีการศึกษา</label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(Number(e.target.value))}
                className="p-1 border border-gray-300 rounded-lg"
              >
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

            <div className="flex-col items-center">
              <label className="block mb-2">ภาคเรียน</label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="p-1 border border-gray-300 rounded-lg"
              >
                <option value={1}>เทอม 1</option>
                <option value={2}>เทอม 2</option>
                <option value={3}>เทอม 3</option>
              </select>
            </div>

            <div className="flex-col items-center">
              <label className="block mb-2">วิทยาเขต</label>
              <select
                value={campus}
                onChange={(e) => setCampus(Number(e.target.value))}
                className="p-1 border border-gray-300 rounded-lg"
              >
                <option value={10}>10 : มจพ. กรุงเทพฯ</option>
                <option value={21}>21 : มจพ. วิทยาเขตระยอง</option>
                <option value={36}>25 : มจพ. วิทยาเขตปราจีนบุรี</option>
              </select>
            </div>

            <div className="flex-col items-center">
              <label className="block mb-2">ระดับ</label>
              <select
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="p-1 border border-gray-300 rounded-lg"
              >
                <option value={41}>41 : ประกาศนียบัตรวิชาชีพ</option>
                <option value={51}>51 : ประกาศนียบัตรวิชาชีพชั้นสูง</option>
                <option value={61}>61 : ปริญญาตรี 4 ปี / 5 ปี</option>
                <option value={62}>62 : ปริญญาตรีต่อเนื่อง 2 - 3 ปี</option>
                <option value={63}>63 : ปริญญาตรีเทียบโอน 2 - 3 ปี</option>
                <option value={71}>71 : ประกาศนียบัตรบัณฑิต</option>
                <option value={81}>81 : ปริญญาโท</option>
                <option value={91}>91 : ปริญญาเอก</option>
              </select>
            </div>

            <div className="flex-col items-center">
              <label className="block mb-2">คณะ/วิทยาลัย</label>
              <select
                value={faculty}
                onChange={(e) => setFaculty(Number(e.target.value))}
                className="p-1 border border-gray-300 rounded-lg"
              >
                <option value={0}>00 : ทุกคณะ</option>
                <option value={1}>01 : คณะวิศวกรรมศาสตร์</option>
                <option value={2}>02 : คณะครุศาสตร์อุตสาหกรรม</option>
                <option value={3}>03 : วิทยาลัยเทคโนโลยีอุตสาหกรรม</option>
                <option value={4}>04 : คณะวิทยาศาสตร์ประยุกต์</option>
                <option value={5}>05 : คณะอุตสาหกรรมเกษตรดิจิทัล</option>
                <option value={6}>06 : คณะเทคโนโลยีและการจัดการอุตสาหกรรม</option>
                <option value={7}>07 : คณะเทคโนโลยีสารสนเทศและนวัตกรรมดิจิทัล</option>
                <option value={8}>08 : คณะศิลปศาสตร์ประยุกต์</option>
                <option value={9}>09 : บัณฑิตวิทยาลัยวิศวกรรมศาสตร์นานาชาติฯ</option>
                <option value={10}>10 : บัณฑิตวิทยาลัย</option>
                <option value={11}>11 : คณะสถาปัตยกรรมและการออกแบบ</option>
                <option value={12}>12 : คณะวิศวกรรมศาสตร์และเทคโนโลยี</option>
                <option value={13}>13 : คณะวิทยาศาสตร์ พลังงานและสิ่งแวดล้อม</option>
                <option value={14}>14 : คณะบริหารธุรกิจ</option>
                <option value={15}>15 : วิทยาลัยนานาชาติ</option>
                <option value={16}>16 : คณะพัฒนาธุรกิจและอุตสาหกรรม</option>
                <option value={17}>17 : คณะบริหารธุรกิจและอุตสาหกรรมบริการ</option>
                <option value={18}>18 : อุทยานเทคโนโลยี มจพ.</option>
              </select>
            </div>
          </div>
          <div className='flex gap-4'>
            {departments.length > 0 && (
              <div className="flex-col items-center">
                <label className="block mb-2">ภาควิชา</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(Number(e.target.value))}
                  className="p-1 border border-gray-300 rounded-lg"
                >
                  {departments.map((dep) => (
                    <option key={dep.comboid} value={dep.comboid}>
                      {dep.comboshow}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex-col items-center">
              <label className="block mb-2">รหัสวิชา</label>
              <input
                type="text"
                value={courseCode}
                placeholder='กรอกรหัสวิชา'
                onChange={(e) => setCourseCode(e.target.value)}
                className="p-1 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex-col items-center">
              <label className="block mb-2">ชื่อวิชา</label>
              <input
                type="text"
                value={courseName}
                placeholder='กรอกชื่อวิชา'
                onChange={(e) => setCourseName(e.target.value)}
                className="p-1 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleFetchData}
                disabled={loading}
                className={`bg-orange-600 hover:bg-red-700 hover:scale-105 transition-all duration-150 text-white font bold py-2 px-6 rounded-lg
                ${loading ? 'opacity-50 cursor-not-allowed' : ''} text-white font-bold py-2 px-6 rounded-lg`}
              >
                {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses List Section */}
      <div className="mt-4">
        <div className='flex justify-between items-end'>
          <div>
            {courses.length > 0 && !loading && <h2 className="text-xl mb-4">ผลการค้นหา</h2>}
            {courses.length > 0 && !loading && <p className="text-sm mb-4">ทั้งหมด {courses.length} รายการ</p>}
          </div>
          <div>
            {courses.length > 0 && !loading && <div className="flex items-center justify-center w-full">
              <div className='flex gap-4 mb-4'>
                {/* Text filter input */}
                <div className="flex-col items-center">
                  <input
                    type="text"
                    value={filterText}
                    onChange={handleFilterTextChange}
                    placeholder='ค้นหาจากผลลัพธ์'
                    className="p-1 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>}
          </div>
        </div>

        <div>
          {loading && <div className="pt-8 flex justify-center items-center">กำลังดึงข้อมูล... <IconLoader className="animate-spin" /></div>}
        </div>
        <div>
          {courses.length === 0 && !loading && <p className="pt-8 text-center mt-4">ไม่พบข้อมูล :/</p>}
        </div>



        {/* Courses Table */}
        {courses.length > 0 && !loading &&
          <div className="overflow-x-auto">
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
                {showAllFiltered ? (
                  filteredCourses.map((course) => (
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
                    ))
                ) : (
                  paginatedCourses.map((course) => (
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
                    ))
                )}
              </tbody>
            </table>
          </div>
        }

        {/* Pagination Controls */}
        {courses.length > 0 && !loading && !showAllFiltered && (
          <div className="flex justify-between items-center mt-4">
            <div>
              <label className="mr-2">แสดง</label>
              <select value={pageSize} onChange={handlePageSizeChange} className="p-1 border border-gray-300 rounded-lg">
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={courses.length}>แสดงทั้งหมด</option>
              </select>
              <span className="ml-2">รายการ</span>
            </div>
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ก่อนหน้า
              </button>
              <span>หน้า {currentPage} / {Math.ceil(courses.length / pageSize)}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(courses.length / pageSize)}
                className="px-3 py-1 border border-gray-300 rounded-lg ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ถัดไป
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
