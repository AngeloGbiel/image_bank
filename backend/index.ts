import express from 'express'
import {sequelize} from './db/conn'
import UserRouter from './Routes/UserRouter'

const app = express()
const port: number = 3000

app.use(express.json());

// Adicionando rotas
app.use(UserRouter)

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
