import fs from 'fs'
import path from 'path'

export const deleteImage = (image:string) =>{
    const pathImage = path.join(__dirname,'../', 'public/images', image)
    if(fs.existsSync(pathImage)){
        fs.unlinkSync(pathImage)
    }
}
export const deleteImageProfileAfterEdit = (image:string) =>{
    const pathImage = path.join(__dirname,'../', 'public/images', image)
    if(fs.existsSync(pathImage)){
        fs.unlinkSync(pathImage)
    }
}
