const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null,`${Date.now()}-${file.fieldname}${ext}`); // Create a unique filename
    }
});

const fileFilter = (req, file, cb) => {
  const allowed = [".jpeg", ".jpg", ".png", ".gif"]; // Allowed file extensions
  const ext = path.extname(file.originalname).toLocaleLowerCase();
    cb(null, allowed.includes(ext)); // Check if the file extension is allowed
};

const upload = multer({
    storage,
    fileFilter
})

module.exports  =upload
