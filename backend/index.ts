import express from 'express'
import {sequelize} from './db/conn'
import router from './Routes/route'


const app = express()
const port: number = 3000

app.use(express.json());

// Adicionando rotas
app.use(router)

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
