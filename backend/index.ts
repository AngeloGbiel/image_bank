import express from 'express'
import {sequelize} from './db/conn'
import UserRouter from './Routes/UserRouter'
import ImagesRouter from './Routes/ImagesRouter'

const app = express()
const port: number = 3000

app.use(express.json());

// Adicionando rotas
app.use(UserRouter)
app.use('/images', ImagesRouter)

sequelize
//.sync({force:true})
.sync()
.then(()=>{
    app.listen(port, () =>{
        console.log(`App rodando na porta ${port}`)
    })
}).catch((err)=>{
    console.log(err)
})
