'use client'
import React, { useState } from 'react';
import Courses from "../components/Courses";
import CustomTable from '../components/CustomTable';

export default function OffersCourses() {
  const [selectedData, setSelectedData] = useState([]);

  const handleSelectedDataChange = (data: any[]) => {
    setSelectedData(data as any);
  };

  return (
    <div className="font-LINESeedSansTH_W_Rg container mx-auto p-8">
      <h1 className="text-2xl mb-4">จัดตารางเรียนจากวิชาที่เปิดสอน</h1>
      <Courses coursesProp={setSelectedData} onSelectedDataChange={handleSelectedDataChange}/>
      <CustomTable courses={selectedData}/>
    </div>
  );
};