'use client';

import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { fetchCourses, fetchDepartments } from '@/lib/api';

export default function CourseSearch() {
    const [year, setYear] = useState('');
    const [yearOptions, setYearOptions] = useState<string[]>([]);
    const [semester, setSemester] = useState('1');
    const [campus, setCampus] = useState('10');
    const [level, setLevel] = useState('61');
    const [faculty, setFaculty] = useState('00');
    const [department, setDepartment] = useState('00');
    const [departmentList, setDepartmentList] = useState<Department[]>([]);

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

    return (
        <main className="font-LINESeedSansTH_W_Rg text-gray-700 px-4 sm:px-12 py-4 w-screen md:w-full">
            <div className="text-4xl">วิชาที่เปิดสอน</div>
            <div className="p-4 mt-4 mb-4 border-1 rounded-lg shadow-md mx-auto">
                <div className="mb-4 flex-col md:flex-row ">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-col items-center w-full">
                            <label className="block mb-2">ปีการศึกษา</label>
                            <Select
                                value={year}
                                onValueChange={(value) => setYear(value)}
                            >
                                <SelectTrigger className="md:w-[130px]">
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

                        <div className="flex-col items-center">
                            <label className="block mb-2">ภาค</label>
                            <Select
                                value={semester}
                                onValueChange={(value) => setSemester(value)}
                            >
                                <SelectTrigger className="md:w-[130px]">
                                    <SelectValue defaultValue={semester} placeholder="เลือกภาคการศึกษา" />
                                </SelectTrigger>
                                <SelectContent className="font-LINESeedSansTH_W_Rg">
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-col items-center">
                            <label className="block mb-2">วิทยาเขต</label>
                            <Select
                                value={campus}
                                onValueChange={(value) => setCampus(value)}
                            >
                                <SelectTrigger className="md:w-[200px]">
                                    <SelectValue defaultValue={campus} placeholder="เลือกวิทยาเขต" />
                                </SelectTrigger>
                                <SelectContent className="font-LINESeedSansTH_W_Rg">
                                    <SelectItem value="10">มจพ. กรุงเทพฯ</SelectItem>
                                    <SelectItem value="21">มจพ. วิทยาเขตระยอง</SelectItem>
                                    <SelectItem value="25">มจพ. วิทยาเขตปราจีนบุรี</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-col items-center">
                            <label className="block mb-2">ระดับ</label>
                            <Select
                                value={level}
                                onValueChange={(value) => setLevel(value)}
                            >
                                <SelectTrigger className="md:w-[240px]">
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
                    <div className="flex flex-col md:flex-row justify-between gap-8 py-4 ">
                        <div className="flex-col items-center">
                            <label className="block mb-2">คณะ</label>
                            <Select
                                value={faculty}
                                onValueChange={(value) => setFaculty(value)}
                            >
                                <SelectTrigger className="md:w-[300px]">
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
                        <div className="flex-col items-center">
                            <label className="block mb-2">ภาควิชา</label>
                            <Select
                                value={department}
                                onValueChange={(value) => setDepartment(value)}
                                disabled={faculty === '00'}
                            >
                                <SelectTrigger className="md:w-[400px]">
                                    <SelectValue defaultValue={department} placeholder="เลือกภาควิชา" />
                                </SelectTrigger>
                                <SelectContent className="font-LINESeedSansTH_W_Rg">
                                    {departmentList.map((option) => (
                                        <SelectItem key={option.comboid} value={option.comboid}>
                                            {option.comboshow.split(' : ')[1]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
