import axios from 'axios';
import { gunzipSync } from 'zlib';
import { TOKEN_API_URL, TIMETABLE_API_URL, CLASSINFO } from '@/config';

let token = '';

const getAuthHeader = async () => {
  token = await getToken();
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
};

function decodeBase64Response(base64EncodedString: string) {
  const decompressed = gunzipSync(Buffer.from(base64EncodedString, 'base64'));
  return JSON.parse(decompressed.toString());
};

export const fetchTimetable = async (year: number, semester: number) => {
  const authHeader = await getAuthHeader();
  const res = await axios.get(`${TIMETABLE_API_URL}/Timetable/${year}/${semester}`, authHeader);
  return decodeBase64Response(res.data.result);
};

export const fetchTimetableSub = async (year: number, semester: number, startDate: string, endDate: string) => {
  const authHeader = await getAuthHeader();
  const res = await axios.get(`${TIMETABLE_API_URL}/Timetablesub/${year}/${semester}/${startDate}/${endDate}`, authHeader);
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
  const authHeader = await getAuthHeader();
  const url = `${CLASSINFO}/Classinfo/${academicYear}/${semester}/${campus}/-/${level}/${faculty}/${department}/${courseCode}/${courseName}/-/0`;
  const res = await axios.get(url, authHeader);
  return decodeBase64Response(res.data.result);
};

// export const gettokenservice = async () => {
//   const res = await axios.get(TOKEN_API_URL);
//   token = res.data;
//   return res.data;
// }

const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const TOKEN_EXPIRY_SECONDS = 1800;

const getTokenTime = (): number => {
  return getStorage('tokentime') ? Number(getStorage('tokentime')) : 0;
};

const fetchNewToken = async (): Promise<string> => {
  const res = await axios.get(TOKEN_API_URL);
  const token = res.data.token;
  setStorage('tokenweb', token);
  setStorage('tokentime', Math.floor(Date.now() / 1000)); // Store current time in seconds
  return token;
};

const getToken = async (): Promise<string> => {
  const token = getStorage('tokenweb');
  const tokenTime = getTokenTime();
  const currentTime = Math.floor(Date.now() / 1000);

  if (!token || currentTime - tokenTime >= TOKEN_EXPIRY_SECONDS) {
    return await fetchNewToken();
  }

  return token;
};
