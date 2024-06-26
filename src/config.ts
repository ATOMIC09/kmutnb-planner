const BASE_API_URL = "https://reg.kmutnb.ac.th/regapiweb" + (Math.floor(3 * Math.random()) + 1) + "/api/th";
const TOKEN_API_URL = BASE_API_URL + "/Validate/tokenservice";
const TIMETABLE_API_URL = BASE_API_URL + "/Timetable";
const CLASSINFO = BASE_API_URL + "/Classinfo";

export { BASE_API_URL, TOKEN_API_URL, TIMETABLE_API_URL, CLASSINFO }