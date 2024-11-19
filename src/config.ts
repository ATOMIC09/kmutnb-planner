const BASE_API_URL = "https://reg.kmutnb.ac.th/regapiweb" + (Math.floor(3 * Math.random()) + 1) + "/api/th";
const TOKEN_API_URL = BASE_API_URL + "/Validate/tokenservice";
const TIMETABLE_API_URL = BASE_API_URL + "/Timetable";
const CLASSINFO_API_URL = BASE_API_URL + "/Classinfo";
const LOGIN_API_URL = BASE_API_URL + "/Account/LoginAD";
const DEPARTMENT_API_URL = BASE_API_URL + "/ComboDep/All";

export { BASE_API_URL, TOKEN_API_URL, TIMETABLE_API_URL, CLASSINFO_API_URL, LOGIN_API_URL, DEPARTMENT_API_URL }