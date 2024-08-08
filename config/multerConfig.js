const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to create dynamic storage configuration
const createStorage =(destination) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join('public', destination);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()+ Math.random() + path.extname(file.originalname))
    },
  });
};

// const upload = multer({ storage: storage,
//   limits: {
//     fileSize: 1024 *1024 *5,
//   }, }).array('file', 5);


// Middleware to handle different destinations

const upload =(destination,next) => {
  const storage = createStorage(destination);
  return (multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10 MB limit
  }))
  next();
};


module.exports = { upload };
