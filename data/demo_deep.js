let originUser = {
    fullname: 'hello',
    age: 12
};

// let copyUser = originUser;
// copyUser.newProp = 'hello world';

// console.log(copyUser, originUser);
let copyUser = JSON.parse(JSON.stringify(originUser));
copyUser.newProp = 'hello world';
console.log(copyUser, originUser);
