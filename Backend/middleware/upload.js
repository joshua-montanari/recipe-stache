const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.ATLAS_URI,
    file: async (req, file) => {
        try {
            return await crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    throw new Error(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images'
                };
                return fileInfo;
            });
        } catch(e) {
            console.log(e.message);
        }
    }
});

const upload = multer({ storage });
module.exports = upload;