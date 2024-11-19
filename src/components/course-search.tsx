'use client';

import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CourseSearch() {
    const [year, setYear] = useState('');
    const [yearOptions, setYearOptions] = useState<string[]>([]);
    const [semester, setSemester] = useState('1');

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

    return (
        <main className="font-LINESeedSansTH_W_Rg text-gray-700 px-12 py-4">
            <div className="text-4xl">วิชาที่เปิดสอน</div>
            <div className="p-4 mt-4 mb-4 border-1 rounded-lg shadow-md">
                <div className="mb-4">
                    <div className="flex gap-8">
                        <div className="flex-col items-center">
                            <label className="block mb-2">ปีการศึกษา</label>
                            <Select 
                                value={year} 
                                onValueChange={(value) => setYear(value)}
                            >
                                <SelectTrigger className="w-[130px]">
                                    <SelectValue defaultValue={year} placeholder="เลือกปีการศึกษา" />
                                </SelectTrigger>
                                <SelectContent>
                                    {yearOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-col items-center">
                            <label className="block mb-2">ภาคการศึกษา</label>
                            <Select 
                                value={semester} 
                                onValueChange={(value) => setSemester(value)}
                            >
                                <SelectTrigger className="w-[130px]">
                                    <SelectValue defaultValue={semester} placeholder="เลือกภาคการศึกษา" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>    
            </div>
        </main>
    );
}
