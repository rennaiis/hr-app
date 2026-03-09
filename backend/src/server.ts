import express from "express";
import cors from "cors"
import { router } from "./routes";
import { initDb } from "./db";
const PORT = 3000
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)


async function start() {
    await initDb()
    app.listen(PORT, ()=>{
        console.log('server started');
    })    
}
start()