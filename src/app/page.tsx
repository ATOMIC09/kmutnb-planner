'use client'
import { useEffect, useState } from "react";
import CourseSearch from "@/components/course-search";
import CourseTable from "@/components/course-table";
import CoursesHint from "@/components/courses-hint";
import CoursesTimetable from "@/components/courses-timetable";
import CoursesSelectedTable from "@/components/courses-selectedtable";

export default function Home() {
  const [coursesResult, setCoursesResult] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);

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

  return (
    <main>
      <div className="font-LINESeedSansTH_W_Rg text-4xl text-center">วิชาที่เปิดสอน</div>
      <div className="flex flex-col items-center w-screen">
        <div className="md:flex">
          <CourseSearch coursesResult={setCoursesResult} />
          <CoursesHint />
        </div>
        {coursesResult.length > 0 && <CourseTable coursesResult={coursesResult} onSelectedDataChange={setSelectedCourses} />}
        {coursesResult.length > 0 && <CoursesTimetable coursesResult={selectedCourses} />}
        {selectedCourses.length > 0 && <CoursesSelectedTable coursesResult={selectedCourses} />}
      </div>
    </main>
  );
}
