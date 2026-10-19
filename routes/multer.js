const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require('path');
const fs = require('fs');

const uploadDirectory = path.join(__dirname, '..', 'public', 'images', 'uploads');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        fs.mkdir(uploadDirectory, { recursive: true }, function(err) {
            cb(err, uploadDirectory);
        });
    },
    filename: function(req, file, cb){
        const uniqueFilename = uuidv4();  //generating a unique filename using uuid
        cb(null, uniqueFilename+path.extname(file.originalname));  //use the unique filename for the uploaded file
    }
})

const upload = multer({storage: storage});

module.exports = upload;
