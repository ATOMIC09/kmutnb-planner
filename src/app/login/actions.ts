// 'use server'
// import axios from 'axios';
// import https from 'https';
// import Encryptor from '@/app/lib/encryption';
// import fs from 'fs';

// export default async function SubmitLogin(prevState: any, formData: FormData){
//     const encryptor = new Encryptor();
//     const username = formData.get('username');
//     const password = formData.get('password');
//     const credentials = { username, password };
//     const encryptedData = encryptor.encryptData(JSON.stringify(credentials));
//     const payload = {
//         "param": encryptedData
//     };
//     const agent = new https.Agent({
//         rejectUnauthorized: false,
//         keepAlive: true,
//         cert: fs.readFileSync('src/app/login/cert.pem'),
//     })

//     console.log('Payload:', payload);
//     try {
//         const response = await axios.post('https://reg.kmutnb.ac.th/regapiweb3/api/th/Account/LoginAD', payload , {
//             headers: {
//                 Authorization: `Bearer TOKEN`,
//             },
//             httpsAgent: agent,
//         });

//         console.log('API Response:', response.data);
//         return { message: "PASS" };
//     } catch (error) {
//         console.error('Error:', error);
//         return { message: error?.message || 'An error occurred' };
//     }
// }
