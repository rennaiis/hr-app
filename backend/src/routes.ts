import { Router } from "express";
import {db} from './db'
import departments from "./data/departments.json"
import jobs from "./data/jobs.json"
import { Employee } from "./types";
const router = Router()

router.get("/", async(req, res)=>{
    const Employees = await db.all(`SELECT * FROM Employees`)
    res.json(Employees)
})

router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    const employee: Employee | undefined = await db.get(`SELECT * FROM Employees WHERE id=?`, [id])
    res.json(employee)
})

router.post('/', async(req, res)=>{
    const emp: Employee = req.body;
    const result = await db.run(
        `INSERT INTO Employees(birth_date, name, passport_data,contact, adress, job, department, salary, hire_date, is_fired) VALUES (?,?,?,?,?,?,?,?,?,?)`, 
        [String(emp.birthDate ?  new Date(emp.birthDate).toISOString() : null), emp.name, emp.passportData, emp.contact, 
        emp.adress, emp.job, emp.department, emp.salary,
         String(emp.hireDate ?  new Date(emp.hireDate).toISOString() : null), false]
    )
    res.json({id: result.lastID})
})

router.put('/:id', async (req, res)=>{
    const id = req.params.id;
    const emp: Employee = req.body;
    const result = await db.run(
        `UPDATE Employees SET birth_date=?, name=?, passport_data=?,contact=?, 
        adress=?, job=?, department=?, salary=?, hire_date=?, is_fired=? WHERE id=?`,
         [String(emp.birthDate ?  new Date(emp.birthDate).toISOString() : null), emp.name, emp.passportData, emp.contact, 
        emp.adress, emp.job, emp.department, emp.salary,
         String(emp.hireDate ?  new Date(emp.hireDate).toISOString() : null), emp.isFired, id]
    )
    res.json({success: true})
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    await db.run("DELETE FROM Employees WHERE id=?", [id])
    res.json({success: true})
})