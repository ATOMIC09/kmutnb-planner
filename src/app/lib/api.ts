import axios from 'axios';
import { gunzipSync } from 'zlib';
import { TOKEN_API_URL, TIMETABLE_API_URL, CLASSINFO_API_URL, LOGIN_API_URL } from '@/config';
import Encryptor from '@/app/lib/encryption';

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

// Axios instance
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      console.log('Token expired, fetching new token...');
      removeStorage('tokenweb');
      removeStorage('tokentime');
      const newToken = await fetchNewToken();
      error.config.headers['Authorization'] = 'Bearer ' + newToken;
      return axiosInstance.request(error.config);
    }
    return Promise.reject(error);
  }
);

export const userLogin = async (username: string, password: string) => {
  const encryptor = new Encryptor();
  const authHeader = await getAuthHeader();
  const credentials = { username, password };
  const encryptedData = encryptor.encryptData(JSON.stringify(credentials));
  const payload = {
      "param": encryptedData
  };

  console.log('Send payload:', payload)
  const res = await axiosInstance.post(LOGIN_API_URL, payload, authHeader);

  console.log('userLogin res :', res);
  return res.data.result;
}

export const fetchTimetable = async (year: number, semester: number) => {
  const authHeader = await getAuthHeader();
  const res = await axiosInstance.get(`${TIMETABLE_API_URL}/Timetable/${year}/${semester}`, authHeader);
  return decodeBase64Response(res.data.result);
};

export const fetchTimetableSub = async (year: number, semester: number, startDate: string, endDate: string) => {
  const authHeader = await getAuthHeader();
  const res = await axiosInstance.get(`${TIMETABLE_API_URL}/Timetablesub/${year}/${semester}/${startDate}/${endDate}`, authHeader);
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

  if (courseCode === '') {
    courseCode = '-';
  }
  if (courseName === '') {
    courseName = '-';
  }
  
  const url = `${CLASSINFO_API_URL}/Classinfo/${academicYear}/${semester}/${campus}/-/${level}/${faculty}/${department}/${courseCode}/${courseName}/-/0`;
  const res = await axiosInstance.get(url, authHeader);
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

const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

const TOKEN_EXPIRY_SECONDS = 1800;

const getTokenTime = (): number => {
  return getStorage('tokentime') ? Number(getStorage('tokentime')) : 0;
};

const fetchNewToken = async (): Promise<string> => {
  const res = await axios.get(TOKEN_API_URL);
  console.log('New token:', res.data.token);
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

export const fetchDepartments = async (facultyId: number) => {
  const authHeader = await getAuthHeader();
  const url = `https://reg.kmutnb.ac.th/regapiweb2/api/th/ComboDep/All/${facultyId}`;
  const res = await axiosInstance.get(url, authHeader);
  return decodeBase64Response(res.data.result);
};