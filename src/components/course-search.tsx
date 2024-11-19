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
        <main className="px-12 py-4">
            <div className="font-LINESeedSansTH_W_Rg text-gray-800 p-4 mt-4 mb-4 border-1 rounded-lg shadow-md">
                <div className="text-2xl mb-4">วิชาที่เปิดสอน</div>

                <div className="flex-col items-center">
                    <label className="block mb-2">ปีการศึกษา</label>
                    <Select 
                        value={year} 
                        onValueChange={(value) => setYear(value)}
                    >
                        <SelectTrigger className="w-[130px]">
                            <SelectValue defaultValue={year} placeholder="Select year" />
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
            </div>
        </main>
    );
}
