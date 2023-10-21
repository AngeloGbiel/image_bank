import express from 'express'
import conn from './db/conn'


const app = express()
const port: number = 3000

conn
//.sync({force:true})
.sync()
.then(()=>{
    app.listen(port, () =>{
        console.log(`App rodando na porta ${port}`)
    })
}).catch((err)=>{
    console.log(err)
})
