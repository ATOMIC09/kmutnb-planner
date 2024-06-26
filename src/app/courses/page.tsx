'use client'
import React, { useEffect, useState } from 'react';
import Courses from "../components/Courses";
// import { gettokenservice } from '../lib/api';

export default function OffersCourses() {
  // const [tokenservice, setTokenservice] = useState<any>({});

  // const getData = async () => {
  //   try {
  //     const tokenserviceData = await gettokenservice();
  //     setTokenservice(tokenserviceData);
  //     console.log('tokenserviceData:', tokenserviceData);
  //   } catch (error) {
  //     console.error('Error fetching tokenservice data:', error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="font-LINESeedSansTH_W_Rg container mx-auto p-4">
      <h1 className="text-2xl mb-4">วิชาที่เปิดสอน</h1>
        <Courses />
    </div>
  );
};