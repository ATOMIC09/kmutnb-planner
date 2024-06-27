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
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

  const handleFetchData = async () => {
    setLoading(true); // Set loading state to true on button click
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
      setLoading(false); // Set loading state to false after data fetching completes
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
                disabled={loading} // Disable button when loading
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
        <span className=''>
          { courses.length > 0 && !loading && <h2 className="text-xl mb-4">ผลการค้นหา</h2> }
          { courses.length > 0 && !loading && <p className="text-sm mb-4">ทั้งหมด {courses.length} รายการ</p> }
        </span>
        <div>
          {loading && <div className="pt-8 flex justify-center items-center">กำลังดึงข้อมูล... <IconLoader className="animate-spin" /></div>}
        </div>

        { courses.length > 0 && !loading && 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div key={course.classid} className="bg-orange-200 p-4 rounded-lg shadow">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h2 className="text-lg font-bold">
                      {course.coursecode} - {course.coursename}
                    </h2>
                    <p>Section: {course.sectioncode}</p>
                    <p>Campus: {course.campusname}</p>
                    <p>Level: {course.levelname}</p>
                    <p>Class Set: {course.classsetdes}</p>
                    <p>Class Status: {course.classstatusdes}</p>
                    <p>Instructor: {course.classinstructorname}</p>
                  </div>
                  <div>
                    <p>
                      <strong>Schedule:</strong> {course.classtime}
                    </p>
                    <p>
                      <strong>Exam:</strong> {course.classexam}
                    </p>
                    <p>
                      <strong>Seats:</strong> {course.enrollseat}/{course.totalseat}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mt-2">Instructors:</h3>
                  <ul>
                    {course.instructor.map((instr: any, idx: number) => (
                      <li key={idx}>
                        {instr.prefixname} {instr.officername} {instr.officersurname}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        }
        </div>
      </div>
  );
}
