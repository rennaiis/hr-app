import express from "express";
import cors from "cors"
import { router } from "./routes";
import { initDb } from "./db";
import { seedDb } from "./seed"; 
const PORT = 3000
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)


async function start() {
    await initDb()
    await seedDb()
    app.listen(PORT, ()=>{
        console.log('server started');
    })    
}
start()