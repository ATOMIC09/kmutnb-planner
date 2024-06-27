// import React, { useEffect, useState } from 'react';

// export default function CustomTimetable({ courses }: { courses: any[] }) {
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const hours = Array.from({ length: 16 }, (_, i) => 6 + i);
//     const dayAbbreviations = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];

//     // useEffect(() => {
//     //     console.log('courses:', courses);
//     // }, [courses]);

//     const extractClassTime = (classTime: string) => {
//         const dayAbbreviation = classTime.split(' ')[1];
//         const timeRange = classTime.match(/\d{2}:\d{2}-\d{2}:\d{2}/g);
//         if (dayAbbreviation && timeRange && timeRange.length === 1) {
//             const startHour = parseInt(timeRange[0].substring(0, 2), 10);
//             const endHour = parseInt(timeRange[0].substring(6, 8), 10);
//             return { dayAbbreviation, startHour, endHour };
//         }
//         return null;
//     }

//     const extractClassSection = (classTime: string) => {
//         const section = classTime.split(' ')[0].trim();
//         return section;
//     }

//     const extractClassRoom = (classTime: string) => {
//         const room = classTime.split(' ')[5].trim();
//         return room;
//     }


//     useEffect(() => {
//         console.log(extractClassTime('S.1 ศ. 13:00-16:00<br>  ห้อง 81-526'));
//         console.log(extractClassSection('S.1 ศ. 13:00-16:00<br>  ห้อง 81-526'));
//         console.log(extractClassRoom('S.1 ศ. 13:00-16:00<br>  ห้อง 81-526'));
//     }, []);


//     return (
//         <div className="bg-orange-100 p-4 rounded-lg">
//             <div className="overflow-x-auto">
//                 {courses.length > 0 && (
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead>
//                             <tr>
//                                 <th className="border border-gray-300 p-2"></th>
//                                 {hours.map((hour) => (
//                                     <th key={hour} className="border border-gray-300 p-2 text-center">{`${hour}:00 - ${hour + 1}:00`}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {days.map((day, dayIndex) => (
//                                 <tr key={day}>
//                                     <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day}</td>
//                                         {hours.map((hour) => (
//                                             <td key={`${day}-${hour}`} className="border border-gray-300 p-2 text-center">
//                                             {courses.filter((course) => course.classtime.includes(`${dayAbbreviations[dayIndex]}. ${hour}:00-${hour + 1}:00`))
//                                             .map((matchedCourse, index) => (
//                                                 <div key={index} className="bg-blue-200 p-1 rounded">
//                                                     {`${matchedCourse.coursecode} (${matchedCourse.sectioncode}) ${matchedCourse.roomname}`}
//                                                 </div>
//                                         ))}
//                                     </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// };






// {/* {courses
//                                             .filter((course) => {
//                                                 // Split class time by <br> and iterate over each schedule
//                                                 const classTimes = course.classtime.split('<br>');
//                                                 console.log('classTimes:', classTimes);
//                                                 return classTimes.some((schedule: string) => {
//                                                     // Check if the schedule includes the current day and hour
//                                                     const dayAbbreviation = schedule.split('.')[0]; // Get the abbreviated day (e.g., "S" for "Sunday")
//                                                     console.log('dayAbbreviation:', dayAbbreviation);
//                                                     const timeRange = schedule.match(/\d{2}:\d{2}-\d{2}:\d{2}/g); // Extract time range
//                                                     console.log('timeRange:', timeRange);
//                                                     if (dayAbbreviation && timeRange && timeRange.length === 1) {
//                                                         const startHour = parseInt(timeRange[0].substring(0, 2), 10); // Extract start hour
//                                                         console.log('startHour:', startHour);
//                                                         const endHour = parseInt(timeRange[0].substring(6, 8), 10); // Extract end hour
//                                                         console.log('endHour:', endHour);
//                                                         return dayAbbreviation === days[dayIndex].substring(0, 2) && hour >= startHour && hour < endHour;
//                                                     }
//                                                     return false;
//                                                 });
//                                             })
//                                             .map((matchedCourse) => (
//                                                 <div key={matchedCourse.classid} className="bg-blue-200 p-1 rounded">
//                                                     {`${matchedCourse.coursecode} (${matchedCourse.sectioncode}) ${matchedCourse.roomname}`}
//                                                 </div>
//                                             ))} */}



// BROKEN AS F

// EXAMPLE DATA
// {
//     "classid": 277943,
//     "program": null,
//     "acadyear": null,
//     "semester": null,
//     "campusid": 10,
//     "campusname": "มจพ. กรุงเทพฯ",
//     "levelid": 61,
//     "levelname": "ปริญญาตรี 4 ปี / 5 ปี",
//     "courseid": 1567,
//     "coursecode": "010093999",
//     "revisioncode": "61",
//     "coursename": "CO-OPERATIVE EDUCATION",
//     "coursenameeng": null,
//     "sectioncode": "1",
//     "totalseat": 10,
//     "enrollseat": 2,
//     "classstatus": "W",
//     "classstatusdes": "เปิดลงปกติ สามารถลงทะเบียนผ่าน WEB ได้",
//     "classset": "A",
//     "classsetdes": "กลุ่มเรียนปกติ",
//     "classnote": "",
//     "classinstructorname": "",
//     "classtime": "L.1 จ. 08:00-12:00<br>  ห้อง -<br>L.1 จ. 13:00-17:00<br>  ห้อง -<br>L.1 อ. 08:00-12:00<br>  ห้อง -<br>L.1 อ. 13:00-17:00<br>  ห้อง -<br>L.1 พ. 08:00-12:00<br>  ห้อง -<br>L.1 พ. 13:00-17:00<br>  ห้อง -<br>L.1 พฤ. 08:00-12:00<br>  ห้อง -<br>L.1 พฤ. 13:00-17:00<br>  ห้อง -<br>L.1 ศ. 08:00-12:00<br>  ห้อง -<br>L.1 ศ. 13:00-17:00<br>  ห้อง -",
//     "classexam": "MIDTERM <br>-<br>FINAL <br>-",
//     "courseunit": "6(0-540-0)",
//     "instructor": []
// }