import express from 'express'
import {sequelize} from './db/conn'
import UserRouter from './Routes/UserRouter'
import ImagesRouter from './Routes/ImagesRouter'
import cors from 'cors'

const app = express()
const port: number = 3000

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Permitir solicitações do domínio http://localhost
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

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
