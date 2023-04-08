const multer = require("multer");
let pd = './uploads'
console.log(pd)
const upload = multer({ dest: pd});

module.exports = { upload };
