const jwt = require('jsonwebtoken');

const SECERT_KEY = 'MERN_STACK_1508';
const ANO_KEY = 'MERN_STACK_1509';

// let student = {
//     _id: 1,
//     fullname: 'mern'
// };

// jwt.sign(student, SECERT_KEY, (err, token) => {
//     console.log({ err, token });
// });

// let resultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImZ1bGxuYW1lIjoibWVybiIsImlhdCI6MTU2NzI1NDg3M30.31_Xj1T42jmECMdq2SxG1OWipC6r8yZMNpqBXSx1s7M'

// jwt.verify(resultToken, SECERT_KEY, (err, data) => {
//     console.log({ err, data });
// });


const signJWT = obj => {
    return new Promise(async resolve => {
        jwt.sign(obj, SECERT_KEY, (err, token) => {
            if (err) 
                return resolve({ error: true, message: err.message });
            return resolve({ error: false, token: token });
        });
    });
}

// IIFE
// (async function(){
//     const resultToken = await signJWT({ fullname: 'hello' });
//     console.log(resultToken);
// })();

// const runJWT = async function(){
//     const resultToken = await signJWT({ fullname: 'hello' });
//     console.log(resultToken);
// }
// runJWT();