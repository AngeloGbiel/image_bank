import multer from "multer";
import path from 'path'

const imageStorage  = multer.diskStorage({
    //definir onde a imagem será salva
    destination: (req,file,cb) => {
        cb(null, 'public/images') //função de callback onde o "null" indica que não houve erros
    },
    filename: (req,file,cb) => {
        cb(
            null,
            Date.now() +
            String(Math.floor(Math.random() * 100)) + 
            path.extname(file.originalname)  //extension (.png,jpeg,etc)
            // todas essas configurações acima faz com que o arquivo tenha um nome único
        )
    }
});
const ImageUpload = multer({
    storage:imageStorage,
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
          // upload only png, jpg and jpeg format
          return cb(new Error("Please only send png or jpg!"));
        }
        cb(null, true) //null -> não há erros. true -> envie e processe as informações
    }
})
export default ImageUpload;