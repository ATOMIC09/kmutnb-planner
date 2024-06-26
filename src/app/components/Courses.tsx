import React, { useEffect, useState } from 'react';
import { fetchCourses } from '../lib/api';

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [academicYear, setAcademicYear] = useState<number>(2567);
  const [semester, setSemester] = useState<number>(1);
  const [campus, setCampus] = useState<number>(10);
  const [level, setLevel] = useState<number>(61);
  const [faculty, setFaculty] = useState<number>(1);
  const [department, setDepartment] = useState<number>(100);
  const [courseCode, setCourseCode] = useState<string>('-');
  const [courseName, setCourseName] = useState<string>('-');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCourses(
          academicYear,
          semester,
          campus,
          level,
          faculty,
          department,
          courseCode,
          courseName
        );
        setCourses(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchData();
  }, [academicYear, semester, campus, level, faculty, department, courseCode, courseName]);

  return (
    <div className="font-LINESeedSansTH_W_Rg container mx-auto p-4">
      <h1 className="text-2xl mb-4">วิชาที่เปิดสอน</h1>
      <div className="space-y-2">
        <div>
          <label className="block mb-2">Academic Year:</label>
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded"
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
        <div>
          <label className="block mb-2">Semester:</label>
          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        {/* Add other dropdowns similarly for campus, level, faculty, department, course code, and course name */}
        <div>
          <label className="block mb-2">Campus:</label>
          <select
            value={campus}
            onChange={(e) => setCampus(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded"
          >
            {/* Add options for Campus */}
          </select>
        </div>
        <div>
          <label className="block mb-2">Level:</label>
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded"
          >
            {/* Add options for Level */}
          </select>
        </div>
        <div>
          <label className="block mb-2">Faculty/College:</label>
          <select
            value={faculty}
            onChange={(e) => setFaculty(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded"
          >
            {/* Add options for Faculty/College */}
          </select>
        </div>
        <div>
          <label className="block mb-2">Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded"
          >
            {/* Add options for Department */}
          </select>
        </div>
        <div>
          <label className="block mb-2">Course Code:</label>
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="p-1 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="p-1 border border-gray-300 rounded"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <div className="space-y-2">
          {courses.map((course) => (
            <div key={course.courseid} className="bg-green-200 p-2 rounded">
              {course.coursecode} - {course.coursename} ({course.sectioncode})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};