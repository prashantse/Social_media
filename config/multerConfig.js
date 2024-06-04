const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"./public")
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
  
});

const upload = multer({
  storage: storage,
  
  // limits: { fileSize: 10000000 }, // 10 MB limit
  // fileFilter: (req, file, cb) => {
  //   checkFileType(file, cb);
  // },
});

// function checkFileType(file, cb) {
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif|mp4|mkv|avi/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Images and Videos Only!');
//   }
// }

module.exports = { upload };
