'use client'
import { useEffect, useState } from "react";
import CourseSearch from "@/components/course-search";
import CourseTable from "@/components/course-table";

export default function Home() {
  const [coursesResult, setCoursesResult] = useState<Course[]>([]);

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
  
  useEffect(() => {
    console.log('coursesResult Prop:', coursesResult);
  }, [coursesResult]);

  return (
    <div className="flex flex-col items-center w-screen">
      <CourseSearch coursesResult={setCoursesResult} />
      {coursesResult.length > 0 && <CourseTable coursesResult={coursesResult} />}
    </div>
  );
}
