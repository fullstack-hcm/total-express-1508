const multer = require('multer');
const path   = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log({ __: __dirname });
        let pathOrigin = path.resolve(__dirname, '../public/users')
      cb(null, pathOrigin)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
  })
  
var upload = multer({ storage: storage })

exports.uploadMulter = upload;