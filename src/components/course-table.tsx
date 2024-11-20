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
    return (
        <main className="font-LINESeedSansTH_W_Rg text-gray-700 px-4 sm:px-12 pt-4 w-screen md:w-[1000px]">
            <div className="p-4 mt-4 border-1 rounded-lg shadow-md mx-auto">
                {coursesResult.length > 0 ? (
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Course Code</th>
                                <th className="border px-4 py-2">Course Name</th>
                                <th className="border px-4 py-2">Instructor</th>
                                <th className="border px-4 py-2">Time</th>
                                <th className="border px-4 py-2">Seats</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coursesResult.map((course) => (
                                <tr key={course.classid}>
                                    <td className="border px-4 py-2">{course.coursecode}</td>
                                    <td className="border px-4 py-2">{course.coursename}</td>
                                    <td className="border px-4 py-2">
                                        {course.instructor
                                            .map(
                                                (inst) =>
                                                    `${inst.prefixname} ${inst.officername} ${inst.officersurname}`
                                            )
                                            .join(", ")}
                                    </td>
                                    <td className="border px-4 py-2">{course.classtime}</td>
                                    <td className="border px-4 py-2">
                                        {course.enrollseat}/{course.totalseat}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No courses found</p>
                )}
            </div>
        </main>
    );
}
