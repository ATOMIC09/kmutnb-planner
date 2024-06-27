import axios from 'axios';
import { gunzipSync } from 'zlib';
import { TOKEN_API_URL, TIMETABLE_API_URL, CLASSINFO_API_URL, LOGIN_API_URL } from '@/config';
import Encryptor from '@/app/lib/encryption';
import { jwtDecode } from "jwt-decode";

let token = '';

class V {
  constructor() {}

  getdateformatora(P: any) {
    let Z;
    if (P instanceof Date) {
      Z = P;
    } else {
      Z = new Date(P);
    }
    const ce = Z.getDate().toString().padStart(2, '0');
    const ve = (Z.getMonth() + 1).toString().padStart(2, '0');
    return Z.getFullYear() + '-' + ve + '-' + ce;
  }
}

const Ie = new V();

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
}

// Axios instance
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      console.log('Got 401 Token expired, fetching new token...');
      removeStorage('tokenweb');
      removeStorage('tokentime');
      const newToken = await fetchNewToken();
      error.config.headers['Authorization'] = 'Bearer ' + newToken;
      return axiosInstance.request(error.config);
    }
    else if (error.response && error.response.status === 404) {
      console.error('Got 404', error.response.data);
      return { status: error.response.status, data: error.response.data };
    } 
    else if (error.response && error.response.status === 500) {
      console.error('Got 500', error.response.data);
      return { status: error.response.status, data: error.response.data };
    }
    else {
      return Promise.reject(error);
    }
  }
);

export const userLogin = async (username: string, password: string) => {
  const encryptor = new Encryptor();
  const authHeader = await getAuthHeader();
  const credentials = { username, password };
  
  // Transform dates and other necessary values before encryption
  const transformedCredentials = JSON.stringify(credentials, function (Me, xe) {
    var Ae = xe;
    return this[Me] instanceof Date && (Ae = Ie.getdateformatora(xe)), void 0 === this[Me] ? null : Ae;
  });
  const encryptedData = encryptor.encryptData(transformedCredentials);
  const payload = {
    param: encryptedData
  };
  console.log('Send payload:', payload);

  try {
    const res = await axiosInstance.post(LOGIN_API_URL, payload, authHeader);
    return res;
  } catch (error) {
    return error;
  }
};

export const userLogout = async () => {
  removeStorage('tokenweb');
  removeStorage('tokentime');
}

export const fetchTimetable = async (year: number, semester: number) => {
  const authHeader = await getAuthHeader();
  const res = await axiosInstance.get(`${TIMETABLE_API_URL}/Timetable/${year}/${semester}`, authHeader);
  if (res.status !== 200) {
    return {status: res.status, data: []};
  }
  return {status: res.status, data: decodeBase64Response(res.data.result)};
};

export const fetchTimetableSub = async (year: number, semester: number, startDate: string, endDate: string) => {
  const authHeader = await getAuthHeader();
  const res = await axiosInstance.get(`${TIMETABLE_API_URL}/Timetablesub/${year}/${semester}/${startDate}/${endDate}`, authHeader);
  if (res.status !== 200) {
    return {status: res.status, data: []};
  }
  return {status: res.status, data: decodeBase64Response(res.data.result)};
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

export const getToken = async (): Promise<string> => {
  const token = getStorage('tokenweb');
  const tokenTime = getTokenTime();
  const currentTime = Math.floor(Date.now() / 1000);

  if (!token || currentTime - tokenTime >= TOKEN_EXPIRY_SECONDS) {
    return await fetchNewToken();
  }

  return token;
};

export const getUserInfo = async () => {
  const token = await getToken();
  const decoded = jwtDecode(token);
  return decoded as any;
}

export const fetchDepartments = async (facultyId: number) => {
  const authHeader = await getAuthHeader();
  const url = `https://reg.kmutnb.ac.th/regapiweb2/api/th/ComboDep/All/${facultyId}`;
  const res = await axiosInstance.get(url, authHeader);
  return decodeBase64Response(res.data.result);
};