import multer from "multer";
import path from "path";
import multerS3 from "multer-s3";
import S3Config from "./S3Config";

const bucket = process.env.BUCKET_PROFILE_USER

const upload = multer({
  storage: multerS3({
    s3: S3Config,
    bucket: `${bucket}`,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        Date.now() +
          String(Math.floor(Math.random() * 100)) +
          path.extname(file.originalname) //extension (.png,jpeg,etc)
        // todas essas configurações acima faz com que o arquivo tenha um nome único
      );
    },
  }),
});

export default upload;
