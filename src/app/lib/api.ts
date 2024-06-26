import axios from 'axios';
import { gunzipSync } from 'zlib';
import { API_BASE_URL } from '@/config';

const authHeader = {
  headers: {
    Authorization: 'Bearer TOKEN',
  },
};

function decodeBase64Response(base64EncodedString: string) {
    const decompressed = gunzipSync(Buffer.from(base64EncodedString, 'base64'));
    return JSON.parse(decompressed.toString());
};

export const fetchTimetable = async (year: number, semester: number) => {
  const res = await axios.get(`${API_BASE_URL}/Timetable/Timetable/${year}/${semester}`, authHeader);
  return decodeBase64Response(res.data.result);
};

export const fetchTimetableSub = async (year: number, semester: number, startDate: string, endDate: string) => {
  const res = await axios.get(`${API_BASE_URL}/Timetable/Timetablesub/${year}/${semester}/${startDate}/${endDate}`, authHeader);
  return decodeBase64Response(res.data.result);
};

export const fetchCourses = async (
  academicYear: number,
  semester: number,
  campus: number,
  level: number,
  faculty: number,
  department: number,
  courseCode: string,
  courseName: string
) => {
  const url = `${API_BASE_URL}/Classinfo/Classinfo/${academicYear}/${semester}/${campus}/-/${level}/${faculty}/${department}/${courseCode}/${courseName}/-/0`;
  const res = await axios.get(url, authHeader);
  return decodeBase64Response(res.data.result);
};