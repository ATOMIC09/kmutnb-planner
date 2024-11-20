import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fetchCourses, fetchDepartments } from '@/lib/api';
import { Loader2 } from "lucide-react"

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

export default function CourseSearch({ coursesResult }: { coursesResult: (data: Course[]) => void }) {
    const [year, setYear] = useState('');
    const [yearOptions, setYearOptions] = useState<string[]>([]);
    const [semester, setSemester] = useState('1');
    const [campus, setCampus] = useState('10');
    const [level, setLevel] = useState('61');
    const [faculty, setFaculty] = useState('00');
    const [department, setDepartment] = useState('00');
    const [departmentList, setDepartmentList] = useState<Department[]>([]);
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    interface Department {
        comboid: string;
        comboshow: string;
    }

    useEffect(() => {
        // Get the current Gregorian year
        const currentYearGregorian = new Date().getFullYear();

        // Convert to the current Thai Buddhist calendar year
        const currentYearThai = currentYearGregorian + 543;

        // Generate an array of years starting from current Thai year to 2555
        const options = Array.from({ length: currentYearThai - 2555 + 1 }, (_, i) => (currentYearThai - i).toString());

        setYearOptions(options);
        setYear(options[0]); // Set the first year (current year) as default
    }, []);

    useEffect(() => {
        const getDepartments = async (facultyId: string) => {
            try {
                const departmentsData = await fetchDepartments(facultyId);
                setDepartmentList(departmentsData);
                if (facultyId === '0') {
                    setDepartment('0');
                } else {
                    setDepartment(departmentsData[0].comboid);
                }
            } catch (error) {
                console.error('Error fetching departments data:', error);
            }
        };
        getDepartments(faculty);
    }, [faculty]);

    const handleFetchData = async () => {
        setIsFetching(true);
        try {
            const coursesData = await fetchCourses(
                year,
                semester,
                campus,
                level,
                faculty,
                department,
                courseCode,
                courseName
            );
            coursesResult(coursesData);
        } catch (error) {
            console.error('Error fetching courses data:', error);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <main className="font-LINESeedSansTH_W_Rg text-gray-700 px-4 pt-4 w-screen md:w-[1000px]">
            <div className="p-4 mt-4 border-1 rounded-lg shadow-md mx-auto">
                <div className="mb-4 flex-col md:flex-row ">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="flex-col items-center flex-auto">
                            <label className="block mb-2">ปีการศึกษา</label>
                            <Select
                                value={year}
                                onValueChange={(value) => setYear(value)}
                            >
                                <SelectTrigger className="md:w-full">
                                    <SelectValue defaultValue={year} placeholder="เลือกปีการศึกษา" />
                                </SelectTrigger>
                                <SelectContent className="font-LINESeedSansTH_W_Rg">
                                    {yearOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-col items-center flex-auto">
                            <label className="block mb-2">ภาค</label>
                            <Select
                                value={semester}
                                onValueChange={(value) => setSemester(value)}
                            >
                                <SelectTrigger className="md:w-full">
                                    <SelectValue defaultValue={semester} placeholder="เลือกภาคการศึกษา" />
                                </SelectTrigger>
                                <SelectContent className="font-LINESeedSansTH_W_Rg">
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-col items-center flex-auto">
                            <label className="block mb-2">วิทยาเขต</label>
                            <Select
                                value={campus}
                                onValueChange={(value) => setCampus(value)}
                            >
                                <SelectTrigger className="md:w-full">
                                    <SelectValue defaultValue={campus} placeholder="เลือกวิทยาเขต" />
                                </SelectTrigger>
                                <SelectContent className="font-LINESeedSansTH_W_Rg">
                                    <SelectItem value="10">มจพ. กรุงเทพฯ</SelectItem>
                                    <SelectItem value="21">มจพ. วิทยาเขตระยอง</SelectItem>
                                    <SelectItem value="25">มจพ. วิทยาเขตปราจีนบุรี</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-col items-center flex-auto">
                            <label className="block mb-2">ระดับ</label>
                            <Select
                                value={level}
                                onValueChange={(value) => setLevel(value)}
                            >
                                <SelectTrigger className="md:w-full">
                                    <SelectValue defaultValue={level} placeholder="เลือกระดับ" />
                                </SelectTrigger>
                                <SelectContent className="font-LINESeedSansTH_W_Rg">
                                    <SelectItem value="41">ประกาศนียบัตรวิชาชีพ</SelectItem>
                                    <SelectItem value="51">ประกาศนียบัตรวิชาชีพชั้นสูง</SelectItem>
                                    <SelectItem value="61">ปริญญาตรี 4 ปี / 5 ปี</SelectItem>
                                    <SelectItem value="62">ปริญญาตรีต่อเนื่อง 2 - 3 ปี</SelectItem>
                                    <SelectItem value="63">ปริญญาตรีเทียบโอน 2 - 3 ปี</SelectItem>
                                    <SelectItem value="71">ประกาศนียบัตรบัณฑิต</SelectItem>
                                    <SelectItem value="81">ปริญญาโท</SelectItem>
                                    <SelectItem value="91">ปริญญาเอก</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
                        <div className="flex-col items-center flex-auto">
                            <label className="block mb-2">คณะ</label>
                            <Select
                                value={faculty}
                                onValueChange={(value) => setFaculty(value)}
                            >
                                <SelectTrigger className="md:w-full">
                                    <SelectValue defaultValue={faculty} placeholder="เลือกคณะ" />
                                </SelectTrigger>
                                <SelectContent className="font-LINESeedSansTH_W_Rg">
                                    <SelectItem value="00">ทุกคณะ</SelectItem>
                                    <SelectItem value="01">คณะวิศวกรรมศาสตร์</SelectItem>
                                    <SelectItem value="02">คณะครุศาสตร์อุตสาหกรรม</SelectItem>
                                    <SelectItem value="03">วิทยาลัยเทคโนโลยีอุตสาหกรรม</SelectItem>
                                    <SelectItem value="04">คณะวิทยาศาสตร์ประยุกต์</SelectItem>
                                    <SelectItem value="05">คณะอุตสาหกรรมเกษตรดิจิทัล</SelectItem>
                                    <SelectItem value="06">คณะเทคโนโลยีและการจัดการอุตสาหกรรม</SelectItem>
                                    <SelectItem value="07">คณะเทคโนโลยีสารสนเทศและนวัตกรรมดิจิทัล</SelectItem>
                                    <SelectItem value="08">คณะศิลปศาสตร์ประยุกต์</SelectItem>
                                    <SelectItem value="09">บัณฑิตวิทยาลัยวิศวกรรมศาสตร์นานาชาติฯ</SelectItem>
                                    <SelectItem value="10">บัณฑิตวิทยาลัย</SelectItem>
                                    <SelectItem value="11">คณะสถาปัตยกรรมและการออกแบบ</SelectItem>
                                    <SelectItem value="12">คณะวิศวกรรมศาสตร์และเทคโนโลยี</SelectItem>
                                    <SelectItem value="13">คณะวิทยาศาสตร์ พลังงานและสิ่งแวดล้อม</SelectItem>
                                    <SelectItem value="14">คณะบริหารธุรกิจ</SelectItem>
                                    <SelectItem value="15">วิทยาลัยนานาชาติ</SelectItem>
                                    <SelectItem value="16">คณะพัฒนาธุรกิจและอุตสาหกรรม</SelectItem>
                                    <SelectItem value="17">คณะบริหารธุรกิจและอุตสาหกรรมบริการ</SelectItem>
                                    <SelectItem value="18">อุทยานเทคโนโลยี มจพ.</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-col items-center flex-auto">
                            <label className="block mb-2">ภาควิชา</label>
                            <Select
                                value={department}
                                onValueChange={(value) => setDepartment(value)}
                                disabled={faculty === '00'}
                            >
                                <SelectTrigger className="md:w-full">
                                    <SelectValue defaultValue={department} placeholder="เลือกภาควิชา" />
                                </SelectTrigger>
                                <SelectContent className="font-LINESeedSansTH_W_Rg">
                                    {faculty !== '00' && departmentList.length > 0 && departmentList.map((option) => (
                                        <SelectItem key={option.comboid} value={option.comboid}>
                                            {option.comboshow.split(' : ')[1]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
                        <div className="flex-col items-center flex-auto">
                            <label className="block mb-2">รหัสวิชา</label>
                            <Input
                                type="text"
                                className="md:w-full p-2 rounded-lg h-12 md:h-9"
                                placeholder="กรอกรหัสวิชา"
                                onChange={(e) => setCourseCode(e.target.value)}
                            />
                        </div>
                        <div className="flex-col items-center flex-auto">
                            <label className="block mb-2">ชื่อวิชา</label>
                            <Input
                                type="text"
                                className="md:w-full p-2 rounded-lg h-12 md:h-9"
                                placeholder="กรอกชื่อวิชา"
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-4 pt-8">
                        <Button
                            variant="outline"
                            className="text-lg text-white hover:text-white rounded-lg w-full h-12 bg-[#ff8838] hover:bg-[#d75f0f]"
                            disabled={isFetching}
                            onClick={handleFetchData}
                        >
                            {isFetching ? <Loader2 className="animate-spin h-6 w-6" /> : ''}
                            {isFetching ? 'กำลังค้นหา...' : 'ค้นหา'}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
