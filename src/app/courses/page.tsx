'use client'
import React, { useEffect, useState } from 'react';
import Courses from "../components/Courses";
import CustomTable from '../components/CustomTable';

export default function OffersCourses() {
  const [selectedData, setSelectedData] = useState([]);

  const handleSelectedDataChange = (data: any[]) => {
    setSelectedData(data as any);
  };

  const handleErrors = (error: any) => {
    alert("มีรายวิชาที่เวลาเรียนชนกัน!");
  }

  // useEffect(() => {
  //   console.log('selectedData page.tsx:', selectedData);
  // }, [selectedData]);

  return (
    <div className="font-LINESeedSansTH_W_Rg container mx-auto p-8">
      <h1 className="text-2xl mb-4">จัดตารางเรียนจากวิชาที่เปิดสอน</h1>
      <Courses coursesProp={setSelectedData} onSelectedDataChange={handleSelectedDataChange} errorProp={handleErrors}/>
      <CustomTable courses={selectedData}/>
    </div>
  );
};