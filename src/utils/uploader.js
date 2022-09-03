const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

exports.profileUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'spaghetti-listener',
    ACL: 'public-read-write',
    key(req, file, cb) {
      cb(null, `profiles/${Date.now()}_${file.originalname}`)
    }
  })
})

exports.postUploader= multer({
  storage: multerS3({
    s3: s3,
    bucket: 'spaghetti-listener',
    ACL: 'public-read-write',
    key(req, file, cb) {
      cb(null, `posts/${Date.now()}_${file.originalname}`)
    }
  })
})