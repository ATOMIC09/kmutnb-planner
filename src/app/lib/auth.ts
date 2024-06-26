// import { encryption } from './encryption';

// export async function login(username: string, password: string) {
//   const apiUrl = "https://reg.kmutnb.ac.th/regapiweb3/api/th/Account/LoginAD";
//   const payload = {
//     param: encryption.encryptData(JSON.stringify({ username, password }))
//   };

//   const response = await fetch(`${apiUrl}/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     throw new Error('Login failed');
//   }

//   return response.json();
// }