import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

const PATH = './db.db'

let db: Database<sqlite3.Database, sqlite3.Statement>;
async function initDb() {
    try{
        console.log();
        db = await open({
            filename: PATH,
            driver: sqlite3.Database
        })
        db.run(`
            CREATE TABLE IF NOT EXISTS Employees(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                birth_date TEXT,
                passport_data TEXT,
                contact TEXT,
                adress TEXT,
                job TEXT,
                department TEXT,
                salary INTEGER,
                hire_date TEXT
            );
        `)
    }catch(err){
        console.log("Ошибка создания бд");
        process.exit(1)
    }
}

export {db, initDb}
