const multer = require("multer");
let pd = require('./uploads')
const upload = multer({ dest: pd});

module.exports = { upload };
