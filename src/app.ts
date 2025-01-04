import express, { Router } from "express";
const app = express();
import router from './route/user'
import cors from 'cors'

app.use(cors(
    {
        origin:"*"
    }
))
app.use(express.json())
app.use('/chat',router)
app.get('/', (req, res) => {
    res.send('Hello World! 2')
})

app.listen(8000, () => {
    console.log(' app listening on port 8000!')
})